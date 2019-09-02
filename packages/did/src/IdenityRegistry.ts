// @ts-ignore
import * as mamClient from 'mam.tools.js';
import { trytesToAscii } from '@iota/converter';

import { encodeToDid, decodeFromDid, createMetaPublicKeys } from './did';
import { Seed, Did, DidDocument, TangleProvider, PublicKeyPem } from '../../types';

const FIRST_MESSAGE = '{}';
const DEFAULT_PROVIDER: TangleProvider = 'https://tangle.puyuma.org';

/**
 * An identity registry is based on the MAM channel, it uses the channel root
 * of the first message to generate the Decentralized Identifier (DID), and
 * store each revision of the DID document.
 */
export class IdenityRegistry {
  provider: TangleProvider;

  /**
   * @constructor
   * @param {object} [params.provider = DEFAULT_PROVIDER] - Uri of IRI node.
   */
  constructor(provider: TangleProvider = DEFAULT_PROVIDER) {
    this.provider = provider;
  }

  /**
   * Publish the DID document to the Tangle MAM channel.
   * @param {string} seed - The seed of the MAM channel.
   * @param {string[]} publicKeys - PEM-formatted public Keys.
   * @returns {Promise} Promise object represents the result. The result
   *   conatains DID `did` and DID document `document`.
   */
  public async publish(seed: Seed, publicKeys: PublicKeyPem[] = []) {
    const iota = mamClient.getIota(this.provider);

    // create the MAM channel from seed.
    const client = await mamClient.createMamFrom({
      iota,
      seed,
      mode: 'public',
    });

    if (client.mam.channel.start !== 0) {
      throw new Error('This identifier is already registered.');
    }

    // publish first message to MAM channel
    const { root } = await mamClient.publish(FIRST_MESSAGE, client.mam, client.iota);

    // encode DID with root of first message
    const did = encodeToDid(root);

    // generate corresponding DID document
    const document: DidDocument = {
      '@context': ['https://w3id.org/did/v1', 'https://w3id.org/security/v2'],
      id: did,
    };
    if (publicKeys.length > 0) {
      document.publicKey = createMetaPublicKeys(did, publicKeys);
      document.assertionMethod = document.publicKey.map(publicKey => publicKey.id);
    }

    // publish DID document to channel
    const message = JSON.stringify(document);
    await mamClient.publish(message, client.mam, client.iota);

    return { did, document };
  }

  /**
   * Fetch DID document by DID.
   * @param {string} did - The DID of DID document.
   * @returns {Promise<string>} Promise object represents the
   *   {@link https://w3c-ccg.github.io/did-spec/#did-documents DID Document}.
   */
  public async fetch(did: Did): Promise<DidDocument> {
    // decode DID
    const decoded = decodeFromDid(did);

    // use channel root to get messages
    const iota = mamClient.getIota(this.provider);
    const { messages } = await mamClient.getMessages(decoded.channelRoot, 'public', null, iota);
    if (messages.length === 0) {
      throw new Error('Could not find the corresponding DID document');
    }

    // check first message
    const firstMessage = trytesToAscii(messages[0]);
    if (firstMessage !== FIRST_MESSAGE) {
      throw new Error(`Root message does not match: ${FIRST_MESSAGE}`);
    }

    // get latest message in the MAM channel
    const index = messages.length - 1;
    const document = JSON.parse(trytesToAscii(messages[index]));

    return document;
  }
}
