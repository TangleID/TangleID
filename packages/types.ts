export type Seed = string;
export type Did = string;
export type DidDocument = {
  '@context': string;
  id: Did;
  publicKey?: PublicKeyMeta[];
};

export type NetworkIdentifer = string;
export type Address = string;

export type Payload = Buffer[];
export type Mnid = string;
export type MnidModel = {
  network: NetworkIdentifer;
  address: Address;
};

export type IriProviders = {
  [index: string]: string;
};

export type PublicKeyPem = string;
export type PublicKeyMeta = {
  id: string;
  type: string;
  controller: Did;
  publicKeyPem: PublicKeyPem;
};

export type PrivateKeyPem = string;
