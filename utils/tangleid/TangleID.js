import CoreAPI from './CoreAPI';

/**
 * Class provide an interface to interact with TangleID core API and extensions.
 */
class TangleID {
  /**
   * Create a TangleID instance.
   * @param {Object} settings - The settings of the TangleID.
   * @param {string} settings.provider - An address that provide the TanlgeID API.
   */
  constructor(settings) {
    this.settings = settings;
    this.api = new CoreAPI(this.settings);
  }

  /**
   * Register an extension into TangleID.
   * @param {Object} extension - The extension that will be registered into TangleID.
   * @param {string} extension.namespace - The namespace of the extension.
   */
  use(extension) {
    const namespace = extension.getNamespace();
    this[namespace] = extension;
  }
}

export default TangleID;
