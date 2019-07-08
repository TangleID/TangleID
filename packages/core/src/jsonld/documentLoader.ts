import { IdenityRegistry, decodeFromDidUrl, isDidUrl } from '@tangleid/did';
import { findNodeById } from '@tangleid/jsonld';
// @ts-ignore
import * as jsonld from 'jsonld';
import UniversalResolver from '../resolver/UniversalResolver';
// @ts-ignore
const nodeDocumentLoader = jsonld.documentLoaders.node();

type CachedDocuments = {
  [index: string]: any;
};

export class DocumentLoader {
  registry: IdenityRegistry;
  documents: CachedDocuments = {};
  private universalResolver: UniversalResolver | null;

  constructor(registry: IdenityRegistry) {
    this.registry = registry;
    this.universalResolver = null;
  }

  setUniversalResolver(universalResolver: UniversalResolver) {
    this.universalResolver = universalResolver;
  }

  getniversalResolver() {
    return this.universalResolver;
  }

  getDocuments() {
    return this.documents;
  }

  setDocuments(documents: CachedDocuments) {
    this.documents = { ...this.documents, ...documents };
  }

  async resolveDocument(url: string): Promise<any> {
    const decoded = decodeFromDidUrl(url);
    // use the document loader if given URL is not DID URL
    if (decoded == null) {
      const result = await nodeDocumentLoader(url);
      return result.document;
    }

    if (decoded.method === 'tangle') {
      let document = (await this.registry.fetch(decoded.did)) as object;
      if (decoded.fragment) {
        const node = await findNodeById(document, url);
        if (node !== null) {
          document = node;
        }
      }

      return document;
    }

    if (this.universalResolver === null) {
      throw new Error('Cound not resolve document: No univseral resolver available.');
    }

    const resolved = await this.universalResolver.resolve(decoded.did);

    return resolved.didDocument;
  }

  loader() {
    return async (url: string) => {
      let document = this.documents[url];
      // resolve the document if it is not in the cache
      if (document === undefined) {
        document = await this.resolveDocument(url);
        this.documents[url] = document;
      }

      return {
        document,
        contextUrl: null,
        documentUrl: url,
      };
    };
  }
}
