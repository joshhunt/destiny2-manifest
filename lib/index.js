import { getAllDestinyManifestComponents, getDestinyManifest, } from 'bungie-api-ts/destiny2';
import { displayDescription, displayName, escapeRegExp, progressDescription, statName, tierName } from './lazyUtils.js';
import fetch from 'cross-fetch';
import { generateHttpClient } from 'destiny2-utils';
export let language = 'en';
export let isVerbose = false;
/** run this if you love console logs */
export const verbose = () => {
    isVerbose = true;
};
/**
 * this httpClient starts out with no api key, which it turns out,
 * works fine 99% of the time to fetch manifest metadata. use without
 * setApiKey if you're the gambing type.
 */
let httpClient = generateHttpClient(fetch);
/**
 * if you like doing things THE RIGHT WAY,
 * you should add an api key to httpClient
 */
export const setApiKey = (apiKey) => {
    httpClient = generateHttpClient(fetch, apiKey);
};
/**
 * change the language
 */
export const setLanguage = (lang) => {
    language = lang;
};
/** await this for the current manifest metadata (version, paths) */
export let manifestMetadataPromise;
/** you could run this to refresh manifest version, or after adding a api key */
export const fetchManifestMetadata = () => {
    manifestMetadataPromise = (async () => {
        const fetchedManifestMetadata = await getDestinyManifest(httpClient);
        return fetchedManifestMetadata.Response;
    })();
    return manifestMetadataPromise;
};
/**
 * you could access this directly,
 * if you're no fun and don't like my convenience functions
 *
 * it's the big old object with all manifest data in it
 */
export let allManifest;
export const setManifest = (manifest) => {
    allManifest = manifest;
};
/** stores the manifestVersion that we have cached */
export const setLoadedVersion = (version) => {
    loadedVersion = version;
};
/** which version is actually in the manifest variable */
export let loadedVersion = 'nothing loaded';
/** await this to make sure stuff is loaded */
let downloadsInProgress = [];
/**
 * don't use this directly.
 *
 * `load()` from the browser or node version should automatically
 * deal with making sure we tried to get a cached version first,
 * loadedVersion is correct, etc.
 */
export const loadManifestFromApi = async (forceUpdate = false) => {
    const manifestMetadata = await fetchManifestMetadata();
    isVerbose &&
        !forceUpdate &&
        console.log(`version loaded in memory: "${loadedVersion}"
version in API: "${manifestMetadata.version}"`);
    // we're done if the API version already matches the one we have loaded
    if (!forceUpdate && loadedVersion === manifestMetadata.version) {
        isVerbose && console.log('loaded manifest is already up to date');
        return;
    }
    isVerbose && console.log('getting entire manifest from API');
    allManifest = await getAllDestinyManifestComponents(httpClient, { destinyManifest: manifestMetadata, language });
    isVerbose && console.log(`manifest downloaded. ${Object.keys(allManifest !== null && allManifest !== void 0 ? allManifest : {}).length} components`);
    setLoadedVersion(`${manifestMetadata.version}__${language}`);
};
/** performs a lookup of a known hash */
export const get = (componentName, hash) => {
    hash = Number(hash !== null && hash !== void 0 ? hash : -99999999);
    if (!allManifest)
        throw Error('manifest accessed before being loaded');
    return allManifest[componentName][hash];
};
/** returns an array of table contents */
export const getAll = (componentName, filter) => {
    var _a;
    if (!allManifest)
        throw Error('manifest accessed before being loaded');
    const all = Object.values((_a = allManifest[componentName]) !== null && _a !== void 0 ? _a : {});
    return filter ? all.filter(filter) : all;
};
/** returns a manifest component (a set of definitions keyed by hash number) */
export const getComponent = (componentName) => {
    if (!allManifest)
        throw Error('manifest accessed before being loaded');
    return allManifest === null || allManifest === void 0 ? void 0 : allManifest[componentName];
};
export const find = (tableName, needle, tableFilter) => {
    let searchResults = [];
    let needles;
    try {
        needles = [new RegExp(`\\b${needle}\\b`, 'i'), new RegExp(needle, 'i'), new RegExp(escapeRegExp(needle), 'i')];
    }
    catch (_a) {
        isVerbose && console.log('parsing a regex did not go well. trying simpler.');
        needles = [new RegExp(`\\b${escapeRegExp(needle)}\\b`, 'i'), new RegExp(escapeRegExp(needle), 'i')];
    }
    searching: {
        const searchFields = [displayName, displayDescription, progressDescription, statName, tierName];
        for (const needleRegex of needles) {
            for (const searchField of searchFields) {
                searchResults = getAll(tableName)
                    .filter(tableFilter ? tableFilter : () => true)
                    .filter((item) => needleRegex.test(searchField(item)));
                if (searchResults.length)
                    break searching;
            }
        }
    }
    const filteredSearchResults = searchResults.filter((item) => { var _a; return !isItem(item) || ((_a = item.itemCategoryHashes) === null || _a === void 0 ? void 0 : _a.some((hash) => preferredCategories.includes(hash))); });
    const finalSearchResults = filteredSearchResults.length ? filteredSearchResults : searchResults;
    return finalSearchResults;
};
export default {
    /**
     * if you like doing things THE RIGHT WAY,
     * you should add an api key to httpClient
     */
    setApiKey,
    /** run this if you love console logs */
    verbose,
    language,
    /**
     * don't use this.
     *
     * `update()` from the browser or node version should automatically
     * deal with making sure something is loaded, we've updated
     * version numbers, etc.
     */
    load: loadManifestFromApi,
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
};
const preferredCategories = [1, 20, 18, 19, 16, 34, 35, 39, 42, 43, 44, 53, 1784235469, 2088636411];
/**
 * checks bungie.net for the current manifest version
 * downloads a copy if there's a newer version than saved
 * loads up the newest manifest afterward
 */
/** look a typeguard */
function isItem(entry) {
    return entry.itemCategoryHashes !== undefined;
}
// async function getManifestComponent (
//   language: string,
//   tableName: DestinyManifestComponentName,
//   ignoreIfVersion: string = '',
//   verbose = false,
// ) {
//   const manifestMetadata = await manifestMetadataPromise;
//   const versionMismatch = ignoreIfVersion !== manifestMetadata.version;
//   if (verbose)
//     console.log(
//       `${
//         ignoreIfVersion && versionMismatch ? `bungie.net has a manifest version !== ${ignoreIfVersion} ` : ''
//       }downloading version ${manifestMetadata.version}`,
//     );
//   return (
//     versionMismatch &&
//     getDestinyManifestComponent(httpClient, { destinyManifest: manifestMetadata, tableName, language })
//   );
// }
// export async function getSomeTables<T extends DestinyManifestComponentName[]>(
//   language: string,
//   tableNames: T,
//   ignoreIfVersion: string = '',
//   verbose = false,
// ) {
//   //: Promise<Pick<AllDestinyManifestComponents, T[number]> | false>
//   const manifestMetadata = await manifestMetadataPromise;
//   const versionMismatch = ignoreIfVersion !== manifestMetadata.version || null;
//   if (verbose)
//     console.log(
//       `${
//         ignoreIfVersion && versionMismatch ? `bungie.net has a manifest version !== ${ignoreIfVersion} ` : ''
//       }downloading version ${manifestMetadata.version}`,
//     );
//   return (
//     versionMismatch && getDestinyManifestSlice(httpClient, { destinyManifest: manifestMetadata, tableNames, language })
//   );
// }
// export async function getAllTables(ignoreIfVersion: string = '') {
//   const manifestMetadata = await manifestMetadataPromise;
//   const alreadyUpdated = ignoreIfVersion === manifestMetadata.version;
//   if (verbose) {
//     console.log(`bungie.net has manifest version "${manifestMetadata.version}"`);
//     console.log(`we have version "${ignoreIfVersion}"`);
//     ignoreIfVersion && alreadyUpdated && console.log(`these match and we will skip download`);
//     !ignoreIfVersion && console.log(`no instructions given to avoid performing a download`);
//     ignoreIfVersion && !alreadyUpdated && console.log(`time to upgrade`);
//     (!ignoreIfVersion || (ignoreIfVersion && !alreadyUpdated)) &&
//       console.log(`about to download ${manifestMetadata.version}`);
//   }
//   return (
//     !alreadyUpdated && getAllDestinyManifestComponents(httpClient, { destinyManifest: manifestMetadata, language })
//   );
// }
