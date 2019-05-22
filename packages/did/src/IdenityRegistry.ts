// @ts-ignore
import * as tic from 'tic.api.js';
// @ts-ignore
import * as mamClient from 'mam.tools.js';

import { encodeToDid, decodeFromDid, createMetaPublicKeys } from './did';
import {
  Seed,
  Did,
  DidDocument,
  IriProviders,
  NetworkIdentifer,
  PublicKeyPem,
} from '../../types';

const DEFAULT_PROVIDERS: IriProviders = {
  '0x1': 'https://nodes.thetangle.org:443',
  '0x2': 'https://nodes.devnet.thetangle.org:443',
};

type IdenityRegistryParams = {
  providers?: IriProviders;
};

/**
 * An identity registry is based on the Trusted IOTA Contacts (TIC),
 * it uses the master channel root to generate the Decentralized Identifier (DID)
 * and uses the profile channel to save the corresponding DID document.
 */
export default class IdenityRegistry {
  providers: IriProviders;

  /**
   * @constructor
   * @param {object} [params.providers = DEFAULT_PROVIDERS] - The IRI node providers in differenct network.
   */
  constructor(params: IdenityRegistryParams = {}) {
    this.providers = params.providers || DEFAULT_PROVIDERS;
  }

  getProvider = (network: NetworkIdentifer) => {
    return this.providers[network];
  }

  getIota = (network: NetworkIdentifer) => {
    const provider = this.getProvider(network);
    mamClient.setProvider(provider);
    const iota = mamClient.getIota();

    return iota;
  }

  getTicClient = async (network: NetworkIdentifer, seed: Seed) => {
    const iota = this.getIota(network);
    let ticClient = await tic.init.fromMasterSeed({ masterSeed: seed, iota });
    if (!ticClient.profile) {
      ticClient = await tic.create.from({ seed, iota });
    }

    return ticClient;
  }

  /**
   * Publish the DID document to the Tangle MAM channel with specific network.
   * @param {string} network - The network identitfer.
   * @param {string} seed - The seed of the MAM channel.
   * @param {string[]} publicKeys - PEM-formatted public Keys.
   * @returns {Promise} Promise object represents the result. The result
   *   conatains DID `did` and DID document `document`.
   */
  publish = async (
    network: NetworkIdentifer,
    seed: Seed,
    publicKeys: PublicKeyPem[] = [],
  ) => {
    const ticClient = await this.getTicClient(network, seed);
    const did = encodeToDid({ network, address: ticClient.masterRoot });
    const document: DidDocument = {
      '@context': 'https://w3id.org/did/v1',
      id: did,
    };

    if (publicKeys.length > 0) {
      document.publicKey = createMetaPublicKeys(did, publicKeys);
    }

    await tic.profile.putInfo(ticClient.profile, document);

    return { did, document };
  }

  /**
   * Fetch DID document by DID.
   * @param {string} did - The DID of DID document.
   * @returns {Promise<string>} Promise object represents the
   *   {@link https://w3c-ccg.github.io/did-spec/#did-documents DID Document}.
   */
  fetch = async (did: Did): Promise<DidDocument> => {
    const { network, address } = decodeFromDid(did);
    const iota = await this.getIota(network);
    const channelRoots = await tic.getChannelRoots(address, iota);
    const profile = await tic.profile.get(channelRoots.profile, iota);

    return profile;
  }
}
