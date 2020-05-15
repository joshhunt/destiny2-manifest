import { Store, get, keys, set } from 'idb-keyval';

import D2Manifest from '..';
import { compareVersionNumbers } from 'destiny2-utils/manifest';

const manifestStore = new Store('manifestDb', 'manifestStore');

/**
 * D2Manifest but saves manifest obects to indexeddb
 */
export default class D2ManifestNode extends D2Manifest {
  // check files in the manifestsPath, find the highest numbered one
  async latest() {
    const manifestsByVersion = ((await keys(manifestStore)) as string[]).sort(compareVersionNumbers);
    // trim 83341.20.04.17.1921-8.json to 83341.20.04.17.1921-8
    return manifestsByVersion[0]?.replace('.json', '') ?? '';
  }

  /**
   * loads an ALREADY saved manifest file
   * update()s one from the internet if none is found,
   * unless suppressUpdate is set
   */
  async load(suppressUpdate = false) {
    const latestManifest = await this.latest();
    if (latestManifest) {
      this.verbose && console.log(`loading latest saved manifest: ${latestManifest}`);
      try {
        this.manifest = await get(latestManifest, manifestStore);
        this.verbose && console.log('manifest loaded');
      } catch (e) {
        console.log(e);
      }
    } else {
      this.verbose && console.log('no latest manifest found.');
      if (suppressUpdate) return;
      this.verbose && console.log('downloading new manifest.');
      await this.update();
    }
  }

  /**
   * saves the loaded manifest to a json file
   */
  async save(version: string) {
    await set(version, this.manifest, manifestStore);
    return true;
  }
}
