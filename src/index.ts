import {
  AllDestinyManifestComponents,
  DestinyDefinitionFrom,
  DestinyManifestComponentName,
} from 'bungie-api-ts/destiny2/manifest';
import { displayDescription, displayName, escapeRegExp, progressDescription, statName, tierName } from './lazyUtils';
import { getAllTables, manifestMetadataFetcher } from './manifestFetcher';

const preferredCategories = [1, 20, 18, 19, 16, 34, 35, 39, 42, 43, 44, 53, 1784235469, 2088636411];

/**
 * FEED ME A STRAY API TOKEN
 */
export default class D2Manifest {
  apiToken: string;
  language: string;
  verbose: boolean;
  manifest: AllDestinyManifestComponents | undefined;
  /**
   * @param apiToken api token for bungie.net
   * @param language en (default) / fr / es / es-mx / de / it / ja / pt-br / ru / pl / ko / zh-cht / zh-chs
   * @param verbose console log steps during async methods
   */
  constructor(apiToken: string, language: string = 'en', verbose: boolean = false) {
    this.apiToken = apiToken;
    this.language = language;
    this.verbose = verbose;
    manifestMetadataFetcher.dispatch(this.apiToken);
  }
  /** stubbed here. no persistent manifest so this just pulls a new one from d2 API */
  async load() {
    return this.update();
  }
  /** stubbed here. no persistent manifest. */
  async save(version: string) {
    return true;
  }
  async latest() {
    return '';
  }

  /**
   * checks bungie.net for the current manifest version
   * downloads a copy if there's a newer version than saved
   * loads up the newest manifest afterward
   */
  async update(force = false) {
    try {
      // ensure we know the API's version
      const manifestMetadata = await manifestMetadataFetcher.promise;
      // so we can compare version number to the API's
      const latestManifest = force ? '!FORCE UPDATE!' : await this.latest();

      this.verbose && console.log(`latest saved version: ${latestManifest}`);
      const manifest = await getAllTables(this.language, latestManifest, true);
      if (!manifest) {
        console.log(`didn't get the manifest\n${manifest === false ? `version matched ${latestManifest}` : ''}`);
        return;
      }
      this.verbose && console.log('manifest downloaded. loading update.');
      this.manifest = manifest;

      this.save(manifestMetadata.version);
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
  find<K extends DestinyManifestComponentName>(tableName: K, needle: string, tableFilter?: (entry: any) => boolean) {
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
  get<K extends DestinyManifestComponentName>(
    tableName: K,
    hash: number | undefined,
  ): DestinyDefinitionFrom<K> | undefined {
    return this.manifest?.[tableName][hash ?? -99999999];
  }

  /** returns an array of table contents */
  getAll<K extends DestinyManifestComponentName>(
    tableName: K,
    tableFilter?: (entry: any) => boolean,
  ): AllDestinyManifestComponents[K][number][] {
    return Object.values(this.manifest?.[tableName] ?? {}).filter(tableFilter ? tableFilter : () => true);
  }
}

/** look a typeguard */
function isItem(entry: any): entry is DestinyDefinitionFrom<'DestinyInventoryItemDefinition'> {
  return entry.itemCategoryHashes !== undefined;
}
