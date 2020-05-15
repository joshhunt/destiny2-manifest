import { AllDestinyManifestComponents, DestinyDefinitionFrom, DestinyManifestComponentName } from 'bungie-api-ts/destiny2/manifest';
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
    constructor(apiToken: string, language?: string, verbose?: boolean);
    /** stubbed here. no persistent manifest so this just pulls a new one from d2 API */
    load(): Promise<void>;
    /** stubbed here. no persistent manifest. */
    save(version: string): Promise<boolean>;
    latest(): Promise<string>;
    /**
     * checks bungie.net for the current manifest version
     * downloads a copy if there's a newer version than saved
     * loads up the newest manifest afterward
     */
    update(force?: boolean): Promise<void>;
    /**
     * searches an entire manifest table, doing case-insenstive string matching.
     * checks against name, description, progressDescription, statName, tierName.
     * prefers matching search term to the entire word.
     * prefers major item categories, trying to avoid weird same-named stuff like catalysts.
     */
    find<K extends DestinyManifestComponentName>(tableName: K, needle: string, tableFilter?: (entry: any) => boolean): AllDestinyManifestComponents[K][number][];
    /** performs a lookup of a known hash */
    get<K extends DestinyManifestComponentName>(tableName: K, hash: number | undefined): DestinyDefinitionFrom<K> | undefined;
    /** returns an array of table contents */
    getAll<K extends DestinyManifestComponentName>(tableName: K, tableFilter?: (entry: any) => boolean): AllDestinyManifestComponents[K][number][];
}
