import NodeCache from 'node-cache';

export default class Styles extends NodeCache {
  fileKey = null;
  constructor(fileKey) {
    super();
    this.fileKey;
  }

  getAllStyles() {
    // this.set(id, styles);
  }
}