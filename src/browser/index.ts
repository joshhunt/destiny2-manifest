import { Store, get as idbGet, keys as idbKeys, set as idbSet } from 'idb-keyval';
import {
  allManifest,
  fetchManifestMetadata,
  find,
  get,
  getAll,
  isVerbose,
  loadManifestFromApi,
  setApiKey,
  setManifest,
  verbose,
  language,
  ManifestLanguage,
} from '../index.js';

import { compareVersionNumbers } from 'destiny2-utils';

export * from '../index.js';

let loadedVersion = 'no loaded';
const manifestStore = new Store('manifestDb', 'manifestStore');

/** check keys in indexeddb, find the highest numbered one */
export const getLatestCachedVersion = async (lang: ManifestLanguage) => {
  const languageSuffix = `__${lang}`;
  const keysInCache = (await idbKeys(manifestStore)) as string[];

  const manifestsByVersion = keysInCache.filter((p) => p.includes(languageSuffix)).sort(compareVersionNumbers);

  return manifestsByVersion[0]?.replace('.json', '') ?? '';
};

/**
 * loads the newest manifest according to what version the API advertises
 *
 * if the newest version is already cached locally, uses that. otherwise
 * downloads the manifest file from the internet
 */
export const load = async () => {
  const apiVersion = `${(await fetchManifestMetadata()).version}__${language}`;
  const latestCachedVersion = await getLatestCachedVersion(language);

  isVerbose &&
    console.log(`version cached: "${latestCachedVersion}"
version loaded in memory: "${loadedVersion}"
version in API: "${apiVersion}"`);
  isVerbose && !latestCachedVersion && console.log('no cached manifest found');

  let latestIsLoaded = false;

  // there's nothing to do. why did you run this?
  if (latestCachedVersion === apiVersion && loadedVersion === latestCachedVersion) {
    latestIsLoaded = true;
  }

  // we already have the latest one cached but it's not loaded
  else if (latestCachedVersion === apiVersion && loadedVersion !== latestCachedVersion)
    try {
      const cachedManifest: typeof allManifest = await idbGet(latestCachedVersion, manifestStore);
      if (!cachedManifest) throw new Error('fetching from indexeddb failed');
      setManifest(cachedManifest);
      isVerbose && `manifest loaded from indexeddb. ${Object.keys(allManifest ?? {}).length} components`;
      latestIsLoaded = true;
      loadedVersion = latestCachedVersion;
    } catch (e) {
      console.log(e);
    }

  // if above checks didn't help, let's do a big download
  if (!latestIsLoaded) {
    isVerbose && console.log(`loading from cache failed or wasn't attempted. starting download.`);
    // dispatch a force download
    await loadManifestFromApi(true);
    loadedVersion = apiVersion;

    // save the results for next time
    save();
  }
};

/** saves the loaded manifest to a json file */
export const save = async () => {
  isVerbose && console.log(`saving manifest to indexeddb`);
  await idbSet(loadedVersion, allManifest, manifestStore);
  return true;
};

export default {
  /**
   * if you like doing things THE RIGHT WAY,
   * you should add an api key to httpClient
   */
  setApiKey,
  /** run this if you love console logs */
  verbose,
  /** performs a lookup of a known hash */
  get,
  /** returns an array of table contents */
  getAll,
  /**
   * searches an entire manifest table, doing case-insenstive string matching.
   *
   * checks against name, description, progressDescription, statName, tierName.
   *
   * prefers matching search term to the entire word.
   *
   * prefers major item categories, trying to avoid weird same-named stuff like catalysts.
   */
  find,
  /**
   * loads the newest manifest according to what version the API advertises
   *
   * if the newest version is already cached locally, uses that. otherwise
   * downloads the manifest file from the internet
   */
  load,
};
