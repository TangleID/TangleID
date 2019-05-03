/** @module jsonld */
// @ts-ignore
import * as jsonld from 'jsonld';

/**
 * Compact JSON-LD document with context.
 * @function compact
 * @param {object} document - JSON-LD document to compacted.
 * @param {context} context - the context to compact with.
 * @param {object} [options = {}] - Options of the compaction.
 * @param {string} [options.base] - the base IRI to use.
 * @param {boolean} [options.compactArrays = true] - true to compact arrays to single values when
 *   appropriate, false not to (default: true).
 * @param {boolean} [options.compactToRelative = true] - true to compact IRIs to be relative to document
 *   base, false to keep absolute (default: true)
 * @param {boolean} [options.graph = false] - true to always output a top-level graph (default: false).
 * @param {context} [options.expandContext] - a context to expand with.
 * @param {boolean} [options.skipExpansion = false] - true to assume the document is expanded and skip
 *   expansion, false not to, defaults to false.
 * @param {documentLoader} [options.documentLoader] - the document loader.
 * @param {expansionMap} [options.expansionMap] - a function that can be used to custom map
 *   unmappable values (or to throw an error when they are detected);
 *   if this function returns `undefined` then the default behavior
 *   will be used.
 * @param {boolean} [options.framing = false] - true if compaction is occuring during a framing operation.
 * @param {compactionMap} [options.compactionMap] - a function that can be used to custom map
 *   unmappable values (or to throw an error when they are detected);
 *   if this function returns `undefined` then the default behavior
 *   will be used.
 * @returns {Promise<object>} Promise that resolves to the compacted document.
 */
export const compact = async (
  document: any,
  context: any,
  options: any = {},
): Promise<object> => {
  // @ts-ignore
  return jsonld.compact(document, context, options);
};

/**
 * Expand JSON-LD document and removes the context.
 * @function expand
 * @param {object} document - JSON-LD document to expand.
 * @param {object} [options = {}] - the options of the expansion.
 * @param {string} [options.base] - the base IRI to use.
 * @param {object} [options.expandContext] - a context to expand with.
 * @param {boolean} [options.keepFreeFloatingNodes = false] - true to keep free-floating
 *   nodes, false not to
 * @param {documentLoader} [options.documentLoader] - the document loader.
 * @param {expansionMap} [options.expansionMap] - a function that can be used to
 *   custom map unmappable values (or to throw an error when they are detected);
 *   if this function returns `undefined` then the default behavior
 *   will be used.
 * @returns {Promise<object>} Promise that resolves to the expanded document.
 */
export const expand = async (doc: any, options: any = {}): Promise<any> => {
  // @ts-ignore
  return jsonld.expand(doc, options);
};

/**
 * Performs RDF dataset normalization on the given input. The input is JSON-LD
 * unless the 'inputFormat' option is used. The output is an RDF dataset
 * unless the 'format' option is used.
 * @function canonize
 * @param {object} input - the input to normalize as JSON-LD or as a format specified by
 *   the 'inputFormat' option.
 * @param {object} [options = {}] - the options to use:
 * @param {string} [options.algorithm = URDNA2015] - the normalization algorithm to use, `URDNA2015` or
 *     `URGNA2012`.
 * @param {string} [options.base] - the base IRI to use.
 * @param {context} [options.expandContext] - a context to expand with.
 * @param {boolean} [options.skipExpansion = false] - true to assume the input is expanded and skip
 *     expansion, false not to, defaults to false.
 * @param {string} [options.inputFormat] - the format if input is not JSON-LD:
 *     'application/n-quads' for N-Quads.
 * @param {string} [options.format] - the format if output is a string:
 *     'application/n-quads' for N-Quads.
 * @param {documentLoader} [options.documentLoader] - the document loader.
 * @param {boolean} [options.useNative = false] - true to use a native canonize algorithm
 * @return {Promise<string>} a Promise that resolves to the normalized output.
 */
export const canonize = async (doc: any, options: any = {}): Promise<string> => {
  // @ts-ignore
  return jsonld.canonize(doc, options);
};
