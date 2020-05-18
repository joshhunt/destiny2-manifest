import * as fs from 'fs';
import { allManifest, fetchManifestMetadata, find, get, getAll, isVerbose, loadManifestFromApi, loadedVersion, setApiKey, setManifest, setStoredVersion, verbose, } from '../index.js';
import { compareVersionNumbers } from 'destiny2-utils';
import { sep } from 'path';
export * from '../index.js';
let manifestsPath = `.${sep}manifest${sep}`;
export const setManifestsPath = (path) => {
    manifestsPath = `${path.replace(/[\\\/]$/, '')}${sep}`;
};
const enforceManifestsDir = () => {
    if (!fs.existsSync(manifestsPath))
        fs.mkdirSync(manifestsPath);
};
/** check files in the manifestsPath, find the highest numbered one */
export const getLatestCachedVersion = () => {
    var _a, _b;
    enforceManifestsDir();
    const manifestsByVersion = fs.readdirSync(manifestsPath).sort(compareVersionNumbers);
    // trim 83341.20.04.17.1921-8.json to 83341.20.04.17.1921-8
    return (_b = (_a = manifestsByVersion[0]) === null || _a === void 0 ? void 0 : _a.replace('.json', '')) !== null && _b !== void 0 ? _b : '';
};
/**
 * loads a LOCAL manifest file (the most recent available) only. won't update or DL if it's missing
 *
 * does not require the internet since you aren't checking the API version
 *
 * returns true if it managed to load a local version of the manifest
 *
 * synchronous!
 */
export const loadLocal = (fromLoad = false) => {
    let manifestDidLoad = false;
    const latestCachedVersion = getLatestCachedVersion();
    isVerbose &&
        !fromLoad &&
        console.log(`version cached: "${latestCachedVersion}"
version loaded in memory: "${loadedVersion}"`);
    isVerbose && !latestCachedVersion && console.log('no latest manifest found');
    if (latestCachedVersion && loadedVersion === latestCachedVersion) {
        isVerbose && console.log(`latest saved version is already loaded`);
        return true;
    }
    // let's try loading the saved copy
    if (latestCachedVersion) {
        isVerbose && console.log(`loading latest saved manifest: ${latestCachedVersion}.json`);
        try {
            setManifest(JSON.parse(fs.readFileSync(manifestsPath + latestCachedVersion + '.json', 'utf8')));
            isVerbose && console.log(`manifest loaded from file. ${Object.keys(allManifest !== null && allManifest !== void 0 ? allManifest : {}).length} components`);
            manifestDidLoad = true;
            setStoredVersion(latestCachedVersion);
        }
        catch (e) {
            isVerbose && console.log('manifest failed loading. file missing? malformed?');
            console.log(e);
        }
    }
    return manifestDidLoad;
};
/**
 * loads the newest manifest according to what version the API advertises
 *
 * if the newest version is already cached locally, uses that. otherwise
 * downloads the manifest file from the internet
 */
export const load = async () => {
    const apiVersion = (await fetchManifestMetadata()).version;
    const latestCachedVersion = getLatestCachedVersion();
    isVerbose &&
        console.log(`version cached: "${latestCachedVersion}"
version loaded in memory: "${loadedVersion}"
version in API: "${apiVersion}"`);
    let latestIsLoaded = false;
    // there's nothing to do. why did you run this?
    if (latestCachedVersion === apiVersion && loadedVersion === latestCachedVersion)
        latestIsLoaded = true;
    // we already have the latest one cached but it's not loaded
    else if (latestCachedVersion === apiVersion && loadedVersion !== latestCachedVersion) {
        const didLoad = loadLocal(true);
        if (didLoad)
            latestIsLoaded = true;
    }
    // if above checks didn't help, let's do a big download
    if (!latestIsLoaded) {
        isVerbose && console.log(`loading from cache failed or wasn't attempted. starting download.`);
        // dispatch a force download
        await loadManifestFromApi(true);
        // save the results for next time
        save();
    }
};
/** saves the loaded manifest to a json file */
export const save = () => {
    isVerbose && console.log(`saving manifest to "${manifestsPath + loadedVersion + '.json'}".`);
    fs.writeFileSync(manifestsPath + loadedVersion + '.json', JSON.stringify(allManifest));
    return true;
};
export default {
    /**
     * if you like doing things THE RIGHT WAY,
     * you should add an api key to httpClient
     */
    setApiKey,
    /**
     * choose a relative or absolute path to a directory to store manifests
     *
     * default: `./manifest/`
     */
    setManifestsPath,
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
     * loads a LOCAL manifest file (the most recent available) only. WILL NOT  update or DL if it's missing.
     * does not require the internet since you aren't checking the API version
     *
     * returns true if it managed to load a local version of the manifest
     *
     * synchronous!!!
     */
    loadLocal,
    /**
     * loads the newest manifest according to what version the API advertises
     *
     * if the newest version is already cached locally, uses that. otherwise
     * downloads the manifest file from the internet
     */
    load,
};
