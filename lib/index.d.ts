import { DestinyDefinitionFrom, DestinyManifestStructure, DestinyManifestTableName } from './api-ts-getter';
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
    constructor(apiToken: string, language?: string, verbose?: boolean, manifestsPath?: string);
    /**
     * loads the ALREADY saved manifest file
     * update()s one from the internet if none is found
     */
    load(): Promise<void>;
    latest(): string;
    /**
     * checks bungie.net for the current manifest version
     * downloads a copy if there's a newer version than saved
     * loads up the newest manifest afterward
     */
    update(): Promise<void>;
    /**
     * searches an entire manifest table, doing case-insenstive string matching.
     * checks against name, description, progressDescription, statName, tierName.
     * prefers matching search term to the entire word.
     * prefers major item categories, trying to avoid weird same-named stuff like catalysts.
     */
    find<K extends DestinyManifestTableName>(tableName: K, needle: string, tableFilter?: (entry: any) => boolean): DestinyManifestStructure[K][number][];
    /** performs a lookup of a known hash */
    get<K extends DestinyManifestTableName>(tableName: K, hash: number | undefined): DestinyDefinitionFrom<K> | undefined;
    /** returns an array of table contents */
    getAll<K extends DestinyManifestTableName>(tableName: K, tableFilter?: (entry: any) => boolean): DestinyManifestStructure[K][number][];
}
