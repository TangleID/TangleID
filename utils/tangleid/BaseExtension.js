
/**
 * Class representing a base extension.
 */
class BaseExtension {
  /**
   * Create a extension instance.
   * @param {string} namespace - The namespace of the extension.
   */
  constructor(namespace) {
    this.namespace = namespace;
  }

  /**
   * Return the namespace of the extension.
   * @return {string} - The namespace of the extension.
   */
  getNamespace() {
    return this.namespace;
  }
}

export default BaseExtension;
