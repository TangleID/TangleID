/** @module jsonld */
// @ts-ignore
import * as jsonld from 'jsonld';
// @ts-ignore
const nodeDocumentLoader = jsonld.documentLoaders.node();

type CachedDocuments = {
  [index: string]: any;
};

/**
 * Create JSON-LD document loader with cache.
 * @function createDocumentLoader
 * @param {object} [documents = {}] - JSON-LD documents in initial cache.
 */
export const createDocumentLoader = (documents: CachedDocuments = {}) => {
  return async (url: string) => {
    const context = documents[url];
    if (context !== undefined) {
      return {
        contextUrl: null,
        documentUrl: url,
        document: context,
      };
    }

    const result = await nodeDocumentLoader(url);
    documents[url] = result.document;
    return result;
  };
};
