import { expand, compact, canonize } from '../src';
import { documentLoader } from './mock/documentLoader';

import {
  document,
  expected_expaneded,
  expected_compacted,
  expected_canonized,
} from './data';

const createMockedLoader = () => {
  return jest.fn((url: string) => {
    return documentLoader(url);
  });
};

describe('documentLoader', () => {
  describe('expand document', () => {
    let expanded: any;
    let mockDocumentLoader: any;

    beforeAll(async () => {
      mockDocumentLoader = createMockedLoader();
      expanded = await expand(document, {
        documentLoader: mockDocumentLoader,
      });
    });

    it('compacted document MUST be same as expected', () => {
      expect(expanded).toEqual(expected_expaneded);
    });

    it('documentLoader MUST be called at least one time', () => {
      expect(mockDocumentLoader.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('compact document', () => {
    let compacted: any;
    let mockDocumentLoader: any;

    beforeAll(async () => {
      mockDocumentLoader = createMockedLoader();
      compacted = await compact(document, document['@context'], {
        documentLoader: mockDocumentLoader,
      });
    });

    it('compacted document MUST be same as expected', () => {
      expect(compacted).toEqual(expected_compacted);
    });

    it('documentLoader MUST be called at least one time', () => {
      expect(mockDocumentLoader.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('canonize document', () => {
    let canonized: any;
    let mockDocumentLoader: any;

    beforeAll(async () => {
      mockDocumentLoader = createMockedLoader();
      canonized = await canonize(document, {
        documentLoader: mockDocumentLoader,
      });
    });

    it('compacted document MUST be same as expected', () => {
      expect(canonized).toBe(expected_canonized);
    });

    it('documentLoader MUST be called at least one time', () => {
      expect(mockDocumentLoader.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
  });
});
