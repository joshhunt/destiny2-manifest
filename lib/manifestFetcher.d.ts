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
export declare function manifestMetadataFetch(): Promise<import("bungie-api-ts/destiny2").DestinyManifest>;
export declare function getTable(language: string, tableName: DestinyManifestTableName, ignoreIfVersion?: string, verbose?: boolean): Promise<false | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyPlaceDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyActivityDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyActivityTypeDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyClassDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyGenderDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyInventoryBucketDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyRaceDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyTalentGridDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyUnlockDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyMaterialRequirementSetDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinySandboxPerkDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyStatGroupDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyProgressionMappingDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyFactionDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyVendorGroupDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyRewardSourceDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyUnlockValueDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyItemCategoryDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyDamageTypeDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyActivityModeDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyActivityGraphDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyCollectibleDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyStatDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyItemTierTypeDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyMetricDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyPlugSetDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyPresentationNodeDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyRecordDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyDestinationDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyEquipmentSlotDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyInventoryItemDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyLocationDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyLoreDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyObjectiveDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyProgressionDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyProgressionLevelRequirementDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinySeasonDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinySeasonPassDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinySocketCategoryDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinySocketTypeDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyTraitDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyTraitCategoryDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyVendorDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyMilestoneDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyActivityModifierDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyReportReasonCategoryDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyArtifactDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyBreakerTypeDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyChecklistDefinition;
} | {
    [key: number]: import("bungie-api-ts/destiny2").DestinyEnergyTypeDefinition;
}>;
export declare function getAllTables(language: string, ignoreIfVersion?: string, verbose?: boolean): Promise<false | import("./api-ts-getter").DestinyManifestStructure>;
