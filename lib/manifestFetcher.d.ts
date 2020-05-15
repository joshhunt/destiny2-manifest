import { DestinyManifest } from 'bungie-api-ts/destiny2';
import { DestinyManifestComponentName } from 'bungie-api-ts/destiny2/manifest';
import { HttpClient } from 'bungie-api-ts/http';
export declare const httpClient: HttpClient;
/**
 * small object with a promise to get API manifest version & paths,
 * and a dispatcher that adds the token in and initiates the request.
 * lives in its own object so we can refer to its results repeatedly,
 * without re-dispatching the request to the api.
 */
export declare const manifestMetadataFetcher: {
    promise: Promise<DestinyManifest>;
    dispatch: (token: string) => Promise<DestinyManifest>;
};
/**
 * in case you're into weird stuff like re-querying the API for updated manifest info
 */
export declare function manifestMetadataFetch(): Promise<DestinyManifest>;
export declare function getTable(language: string, tableName: DestinyManifestComponentName, ignoreIfVersion?: string, verbose?: boolean): Promise<false | {
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
export declare function getAllTables(language: string, ignoreIfVersion?: string, verbose?: boolean): Promise<false | import("bungie-api-ts/destiny2/manifest").AllDestinyManifestComponents>;
export declare function getSomeTables<T extends DestinyManifestComponentName[]>(language: string, tableNames: T, ignoreIfVersion?: string, verbose?: boolean): Promise<Pick<import("bungie-api-ts/destiny2/manifest").AllDestinyManifestComponents, T[number]> | null>;
