import * as fs from 'fs';

import D2Manifest from '..';
import { compareVersionNumbers } from 'destiny2-utils/manifest';
import { sep } from 'path';

/**
 * D2Manifest but saves manifest jsons to a specified path
 */
export default class D2ManifestNode extends D2Manifest {
  manifestsPath: string;
  /**
   * @param apiToken api token for bungie.net
   * @param language en (default) / fr / es / es-mx / de / it / ja / pt-br / ru / pl / ko / zh-cht / zh-chs
   * @param verbose console log steps during async methods
   * @param manifestsPath where to store/load manifests (default "./manifest")
   */
  constructor(
    apiToken: string,
    language: string = 'en',
    verbose: boolean = false,
    manifestsPath: string = `.${sep}manifest`,
  ) {
    super(apiToken, language, verbose);
    this.manifestsPath = `${manifestsPath.replace(/[\\\/]$/, '')}${sep}`;
  }

  // check files in the manifestsPath, find the highest numbered one
  async latest() {
    const manifestsByVersion = fs.readdirSync(this.manifestsPath).sort(compareVersionNumbers);
    // trim 83341.20.04.17.1921-8.json to 83341.20.04.17.1921-8
    return manifestsByVersion[0]?.replace('.json', '') ?? '';
  }

  /**
   * loads an ALREADY saved manifest file
   * update()s one from the internet if none is found,
   * unless suppressUpdate is set
   */
  async load(suppressUpdate = false) {
    if (!fs.existsSync(this.manifestsPath)) fs.mkdirSync(this.manifestsPath);
    const latestManifest = await this.latest();
    this.verbose && !latestManifest && console.log('no latest manifest found');

    let manifestLoadedOk = false;
    if (latestManifest) {
      this.verbose && console.log(`loading latest saved manifest: ${latestManifest}.json`);

      try {
        this.manifest = JSON.parse(fs.readFileSync(this.manifestsPath + latestManifest + '.json', 'utf8'));
        this.verbose && console.log('manifest loaded');
        manifestLoadedOk = true;
      } catch (e) {
        this.verbose && console.log('manifest failed loading. file missing? malformed?');
        console.log(e);
      }

      if (!manifestLoadedOk) {
        if (suppressUpdate) {
          this.verbose && console.log('updating suppressed by suppressUpdate');
          return;
        }
        this.verbose && console.log('downloading new manifest');
        await this.update(!!latestManifest);
      }
    }
  }

  /**
   * saves the loaded manifest to a json file
   */
  async save(version: string) {
    fs.writeFileSync(this.manifestsPath + version + '.json', JSON.stringify(this.manifest));
    return true;
  }
}
