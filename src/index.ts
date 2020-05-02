import * as fs from 'fs';

import { DestinyDefinitionFrom, DestinyManifestStructure, DestinyManifestTableName } from './api-ts-getter';
import { displayDescription, displayName, escapeRegExp, progressDescription, statName, tierName } from './lazyUtils';
import { getAllTables, manifestMetadataPromise } from './manifestFetcher';

import { sep } from 'path';

const preferredCategories = [1, 20, 18, 19, 16, 34, 35, 39, 42, 43, 44, 53, 1784235469, 2088636411];

/**
 * FEED ME A STRAY API TOKEN
 */
export default class D2Manifest {
  apiToken: string;
  language: string;
  verbose: boolean;
  manifestsPath: string;
  manifest: DestinyManifestStructure | undefined;
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
    manifestsPath: string = `.${sep}manifest${sep}`,
  ) {
    this.apiToken = apiToken;
    this.language = language;
    this.verbose = verbose;
    this.manifestsPath = manifestsPath;
  }

  /**
   * loads the ALREADY saved manifest file
   * update()s one from the internet if none is found
   */
  async load() {
    if (!fs.existsSync(this.manifestsPath)) fs.mkdirSync(this.manifestsPath);
    const latestManifest = this.latest();
    if (latestManifest) {
      this.verbose && console.log(`loading latest saved manifest: ${latestManifest}`);
      try {
        this.manifest = JSON.parse(fs.readFileSync(this.manifestsPath + latestManifest, 'utf8'));
        this.verbose && console.log('manifest loaded');
      } catch (e) {
        console.log(e);
      }
    } else {
      this.verbose && console.log('no latest manifest found. updating to get one.');
      await this.update();
    }
  }
  latest() {
    const manifestsByVersion = fs.readdirSync(this.manifestsPath).sort((a, b) => {
      const a_ = a.split(/[-.]/);
      const b_ = b.split(/[-.]/);
      for (var i = 0; i < a_.length; i++) {
        let comparison = Number(a_[i]) - Number(b_[i]);
        if (comparison) return comparison;
      }
      return 0;
    });
    return manifestsByVersion[0];
  }

  /**
   * checks bungie.net for the current manifest version
   * downloads a copy if there's a newer version than saved
   * loads up the newest manifest afterward
   */
  async update() {
    if (!fs.existsSync(this.manifestsPath)) fs.mkdirSync(this.manifestsPath, { recursive: true });
    try {
      const latestManifest = this.latest();

      const manifest = await getAllTables(this.language, latestManifest, true);
      const manifestMetadata = await manifestMetadataPromise;
      if (!manifest) return;
      // this is a criminally poor use of resources when i could just stream the download to a file. but... bleh.
      fs.writeFileSync(this.manifestsPath + manifestMetadata.version + '.json', JSON.stringify(manifest));
      this.verbose && console.log('manifest updated. loading update.');
      this.manifest = manifest;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * searches an entire manifest table, doing case-insenstive string matching.
   * checks against name, description, progressDescription, statName, tierName.
   * prefers matching search term to the entire word.
   * prefers major item categories, trying to avoid weird same-named stuff like catalysts.
   */
  find<K extends DestinyManifestTableName>(tableName: K, needle: string, tableFilter?: (entry: any) => boolean) {
    let searchResults: DestinyDefinitionFrom<K>[] = [];
    let needles: RegExp[];
    try {
      needles = [new RegExp(`\\b${needle}\\b`, 'i'), new RegExp(needle, 'i'), new RegExp(escapeRegExp(needle), 'i')];
    } catch {
      this.verbose && console.log('that regex did not go well. trying simpler.');
      needles = [new RegExp(`\\b${escapeRegExp(needle)}\\b`, 'i'), new RegExp(escapeRegExp(needle), 'i')];
    }
    searching: {
      const searchFields = [displayName, displayDescription, progressDescription, statName, tierName];
      for (const needleRegex of needles) {
        for (const searchField of searchFields) {
          searchResults = this.getAll(tableName)
            .filter(tableFilter ? tableFilter : () => true)
            .filter((item) => needleRegex.test(searchField(item)));
          if (searchResults.length) break searching;
        }
      }
    }
    const filteredSearchResults = searchResults.filter(
      (item) => !isItem(item) || item.itemCategoryHashes?.some((hash) => preferredCategories.includes(hash)),
    );

    const finalSearchResults = filteredSearchResults.length ? filteredSearchResults : searchResults;
    return finalSearchResults;
  }

  /** performs a lookup of a known hash */
  get<K extends DestinyManifestTableName>(
    tableName: K,
    hash: number | undefined,
  ): DestinyDefinitionFrom<K> | undefined {
    return this.manifest?.[tableName][hash ?? -99999999];
  }

  /** returns an array of table contents */
  getAll<K extends DestinyManifestTableName>(
    tableName: K,
    tableFilter?: (entry: any) => boolean,
  ): DestinyManifestStructure[K][number][] {
    return Object.values(this.manifest?.[tableName] ?? {}).filter(tableFilter ? tableFilter : () => true);
  }
}

/** look a typeguard */
function isItem(entry: any): entry is DestinyDefinitionFrom<'DestinyInventoryItemDefinition'> {
  return entry.itemCategoryHashes !== undefined;
}
