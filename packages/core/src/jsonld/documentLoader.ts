import { IdenityRegistry } from '@tangleid/did';
// @ts-ignore
import * as jsonld from 'jsonld';
// @ts-ignore
const nodeDocumentLoader = jsonld.documentLoaders.node();

type CachedDocuments = {
  [index: string]: any;
};

export class DocumentLoader {
  registry: IdenityRegistry;
  documents: CachedDocuments = {};

  constructor(registry: IdenityRegistry) {
    this.registry = registry;
  }

  getDocuments() {
    return this.documents;
  }

  setDocuments(documents: CachedDocuments) {
    this.documents = { ...this.documents, ...documents };
  }

  loader() {
    return async (url: string) => {
      const context = this.documents[url];
      if (context !== undefined) {
        return {
          contextUrl: null,
          documentUrl: url,
          document: context,
        };
      }

      if (url.startsWith('did:tangle:')) {
        const document = await this.registry.fetch(url);

        return {
          document,
          documentUrl: url,
          contextUrl: null,
        };
      }

      const result = await nodeDocumentLoader(url);
      this.documents[url] = result.document;
      return result;
    };
  }
}
