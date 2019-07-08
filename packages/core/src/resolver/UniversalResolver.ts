import axios from 'axios';

import { Did, DidDocument } from '../../../types';

type Response = {
  redirect: string | null;
  didDocument: DidDocument;
  resolverMetadata: any;
};

class UniversalResolver {
  private provider: string;
  constructor(provider: string) {
    this.provider = provider;
  }

  public setProvider(provider: string) {
    this.provider = provider;
  }

  resolve = async (did: Did): Promise<Response> => {
    const response = await axios.get(`${this.provider}/1.0/identifiers/${did}`);
    if (response.status !== 200) {
      throw new Error(`Universal resolver could not resolve: ${did}`);
    }
    const document = response.data;

    return document;
  }
}

export default UniversalResolver;
