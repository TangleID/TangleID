import { IdenityRegistry, decodeFromDidUrl, isDidUrl } from '@tangleid/did';
import { findNodeById } from '@tangleid/jsonld';
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

      if (isDidUrl(url)) {
        const decoded = decodeFromDidUrl(url);
        if (decoded != null && decoded.method === 'tangle') {
          let document = (await this.registry.fetch(decoded.did)) as object;

          if (decoded.fragment) {
            const node = await findNodeById(document, url);
            if (node !== null) {
              document = node;
            }
          }

          return {
            document,
            documentUrl: url,
            contextUrl: null,
          };
        }
      }

      const result = await nodeDocumentLoader(url);
      this.documents[url] = result.document;
      return result;
    };
  }
}
