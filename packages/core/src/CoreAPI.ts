import { IdenityRegistry } from '@tangleid/did';
import { signRsaSignature, verifyRsaSignature } from '@tangleid/jsonld';
import { DocumentLoader } from './jsonld/documentLoader';

import { IriProvider, Seed, Did, PublicKeyMeta, PrivateKeyPem, PublicKeyPem } from '../../types';

export type Settings = {
  provider?: IriProvider;
};

export class CoreAPI {
  private registry: IdenityRegistry;
  private documentLoader: DocumentLoader;

  constructor(settings: Partial<Settings> = {}) {
    this.registry = new IdenityRegistry({ provider: settings.provider });
    this.documentLoader = new DocumentLoader(this.registry);
  }

  /**
   * Publish the DID document to the MAM channel with specific Tangle network.
   *
   * @memberof module:core
   *
   * @function registerIdentifier
   * @param {string} seed - The seed of the MAM channel.
   * @param {string[]} publicKeys - PEM-formatted public Keys.
   * @returns {Promise<object>} Promise object represents the result. The result
   *   conatains DID `did` and DID document `document`.
   */
  public async registerIdentifier(seed: Seed, publicKeys: PublicKeyPem[] = []) {
    const didDocument = await this.registry.publish(seed, publicKeys);

    return didDocument;
  }

  /**
   * Fetch DID document by DID.
   *
   * @memberof module:core
   *
   * @function resolveIdentifier
   * @param {string} did - The DID of DID document.
   * @returns {Promise<object>} Promise object represents the
   *   {@link https://w3c-ccg.github.io/did-spec/#did-documents DID Document}.
   */
  public async resolveIdentifier(did: Did) {
    const didDocument = await this.registry.fetch(did);

    return didDocument;
  }

  /**
   * Sign JSON-LD document with RSA signature suite.
   *
   * @memberof module:core
   *
   * @function signRsaSignature
   * @param {object} document - JSON-LD document to be signed.
   * @param {PublicKeyMeta} publicKey - Public key metadata.
   * @param {string} privateKeyPem - PEM-formatted private key.
   * @returns {Promise<object>} Promise object represents signed JSON-LD document.
   */
  public async signRsaSignature(document: any, publicKey: PublicKeyMeta, privateKeyPem: PrivateKeyPem) {
    const documentSigned = await signRsaSignature(document, publicKey, privateKeyPem, {
      documentLoader: this.documentLoader.loader(),
    });

    return documentSigned;
  }

  /**
   * Verify JSON-LD document signature.
   *
   * @memberof module:core
   *
   * @function verifyRsaSignature
   * @param {object} document - JSON-LD document to be verify.
   * @returns {Promise<boolean>} Promise object represents verification result.
   */
  public async verifyRsaSignature(document: any) {
    const verified = await verifyRsaSignature(document, {
      documentLoader: this.documentLoader.loader(),
    });

    return verified;
  }
}
