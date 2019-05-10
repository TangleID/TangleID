import { IdenityRegistry } from '@tangleid/did';
// @ts-ignore
import * as jsonld from 'jsonld';
// @ts-ignore
const nodeDocumentLoader = jsonld.documentLoaders.node();

type CachedDocuments = {
  [index: string]: any;
};

export const createDocumentLoader = (
  registry: IdenityRegistry,
  {
    documents = {},
  }: {
    documents?: CachedDocuments;
  } = {},
) => {
  return async (url: string) => {
    const context = documents[url];
    if (context !== undefined) {
      return {
        contextUrl: null,
        documentUrl: url,
        document: context,
      };
    }

    if (url.startsWith('did:tangleid:')) {
      const document = await registry.fetch(url);
      return {
        document,
        documentUrl: url,
        contextUrl: null,
      };
    }

    const result = await nodeDocumentLoader(url);
    documents[url] = result.document;
    return result;
  };
};
