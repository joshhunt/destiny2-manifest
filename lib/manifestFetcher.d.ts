import { DestinyManifestTableName } from './api-ts-getter';
import { HttpClientConfig } from 'bungie-api-ts/http';
/**
 * given set of bungie-api-ts params (HttpClientConfig),
 * contacts the API and interprets results as JSON
 */
export declare function httpClient(config: HttpClientConfig): Promise<any>;
/**
 * performs a 1-time fetch on script load, whose results we can
 * repeatedly refer back to if we need, by awaiting it
 */
export declare const manifestMetadataPromise: Promise<import("bungie-api-ts/destiny2").DestinyManifest>;
/**
 * in case you're into weird stuff like re-querying the API for updated manifest info
 */
export declare function manifestMetadataFetch(): Promise<import("bungie-api-ts/destiny2").DestinyManifest | undefined>;
export declare function getTable(language: string, tableName: DestinyManifestTableName, ignoreIfVersion?: string, verbose?: boolean): Promise<any>;
export declare function getAllTables(language: string, ignoreIfVersion?: string, verbose?: boolean): Promise<any>;
