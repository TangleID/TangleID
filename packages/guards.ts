import { SEED_TRYTE_SIZE } from './constants';
import { Seed, Did, NetworkIdentifer, PublicKeyPem, PublicKeyMeta} from './types';

export const isTrytesOfExactLength = (trytes: string, length: number) =>
  typeof trytes === 'string' && new RegExp(`^[9A-Z]{${length}}$`).test(trytes);

export const isTrytesOfMaxLength = (trytes: string, length: number) =>
  typeof trytes === 'string' && new RegExp(`^[9A-Z]{1,${length}}$`).test(trytes);

export const isSeed = (seed: any): seed is Seed => isTrytesOfExactLength(seed, SEED_TRYTE_SIZE);

export const isDid = (did: any): did is Did =>
  typeof did === 'string' && new RegExp(`^did:[a-z]+:[A-Za-z0-9._]+$`).test(did);

export const isPublicKeyArray = (publicKeys: any): publicKeys is PublicKeyPem[] => {
  return true;
};

export const isNetworkIdentifer = (network: any): network is NetworkIdentifer => {
  return true;
};

export const isPublicKeyMeta = (publicKey: PublicKeyMeta): publicKey is PublicKeyMeta => {
  return true;
}

// PrivateKeyPem
