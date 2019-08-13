import { CoreAPI, Settings } from './CoreAPI';

/**
 * Composes API object from it's components
 *
 * @memberof module:core
 *
 * @function composeAPI
 * @param {object} [settings={}] - Connection settings
 * @param {object} [params.provider] - Uri of IRI node.
 *
 * @return {API}
 */
export const composeAPI = (settings: Partial<Settings> = {}) => {
  const api = new CoreAPI(settings);

  return api;
};
