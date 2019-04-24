/** @module did */
// @ts-ignore
import * as mamClient from 'mam.tools.js';
import IdenityRegistry from './IdenityRegistry';

import { NetworkIdentifer, PublicKeyPem } from '../../types';

type RegisterParams = {
  seed?: string;
  network?: NetworkIdentifer;
  publicKey?: PublicKeyPem[] | string;
  registry?: IdenityRegistry;
};

/**
 * Register the TangleID DID(Decentralized Identifier) on the IOTA/Tangle.
 * @method register
 * @param {Object} [options] Registration options
 * @param {string} [options.seed = mamClient.generateSeed()] - The seed for the master channel.
 * @param {string} [options.network = 0x1] - The network identitfer.
 * @param {String|string[]} [options.publicKey = []] - PEM-formatted public Key.
 * @param {IdenityRegistry} [options.registry = new IdenityRegistry()] - The registry used to maintain the identity.
 * @return {Promise} Promise object represents the register result.
 */
const register = async ({
  seed = mamClient.generateSeed(),
  network = '0x1',
  publicKey = [],
  registry = new IdenityRegistry(),
}: RegisterParams) => {
  const publicKeys = Array.isArray(publicKey) ? publicKey : [publicKey];
  const { did, document } = await registry.publish(network, seed, publicKeys);
  return {
    did,
    seed,
    document,
  };
};

export default register;
