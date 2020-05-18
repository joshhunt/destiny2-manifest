export * from '../index.js';
export declare const setManifestsPath: (path: string) => void;
/** check files in the manifestsPath, find the highest numbered one */
export declare const getLatestCachedVersion: () => string;
/**
 * loads a LOCAL manifest file (the most recent available) only. won't update or DL if it's missing
 *
 * does not require the internet since you aren't checking the API version
 *
 * returns true if it managed to load a local version of the manifest
 *
 * synchronous!
 */
export declare const loadLocal: (fromLoad?: boolean) => boolean;
/**
 * loads the newest manifest according to what version the API advertises
 *
 * if the newest version is already cached locally, uses that. otherwise
 * downloads the manifest file from the internet
 */
export declare const load: () => Promise<void>;
/** saves the loaded manifest to a json file */
export declare const save: () => boolean;
declare const _default: {
    /**
     * if you like doing things THE RIGHT WAY,
     * you should add an api key to httpClient
     */
    setApiKey: (apiKey?: string | undefined) => void;
    /**
     * choose a relative or absolute path to a directory to store manifests
     *
     * default: `./manifest/`
     */
    setManifestsPath: (path: string) => void;
    /** run this if you love console logs */
    verbose: () => void;
    /** performs a lookup of a known hash */
    get: <K extends "DestinyPlaceDefinition" | "DestinyActivityDefinition" | "DestinyActivityTypeDefinition" | "DestinyClassDefinition" | "DestinyGenderDefinition" | "DestinyInventoryBucketDefinition" | "DestinyRaceDefinition" | "DestinyTalentGridDefinition" | "DestinyUnlockDefinition" | "DestinyMaterialRequirementSetDefinition" | "DestinySandboxPerkDefinition" | "DestinyStatGroupDefinition" | "DestinyProgressionMappingDefinition" | "DestinyFactionDefinition" | "DestinyVendorGroupDefinition" | "DestinyRewardSourceDefinition" | "DestinyUnlockValueDefinition" | "DestinyItemCategoryDefinition" | "DestinyDamageTypeDefinition" | "DestinyActivityModeDefinition" | "DestinyActivityGraphDefinition" | "DestinyCollectibleDefinition" | "DestinyStatDefinition" | "DestinyItemTierTypeDefinition" | "DestinyMetricDefinition" | "DestinyPlugSetDefinition" | "DestinyPresentationNodeDefinition" | "DestinyRecordDefinition" | "DestinyDestinationDefinition" | "DestinyEquipmentSlotDefinition" | "DestinyInventoryItemDefinition" | "DestinyLocationDefinition" | "DestinyLoreDefinition" | "DestinyObjectiveDefinition" | "DestinyProgressionDefinition" | "DestinyProgressionLevelRequirementDefinition" | "DestinySeasonDefinition" | "DestinySeasonPassDefinition" | "DestinySocketCategoryDefinition" | "DestinySocketTypeDefinition" | "DestinyTraitDefinition" | "DestinyTraitCategoryDefinition" | "DestinyVendorDefinition" | "DestinyMilestoneDefinition" | "DestinyActivityModifierDefinition" | "DestinyReportReasonCategoryDefinition" | "DestinyArtifactDefinition" | "DestinyBreakerTypeDefinition" | "DestinyChecklistDefinition" | "DestinyEnergyTypeDefinition">(componentName: K, hash: string | number | undefined) => import("bungie-api-ts/destiny2").AllDestinyManifestComponents[K][number] | undefined;
    /** returns an array of table contents */
    getAll: <K_1 extends "DestinyPlaceDefinition" | "DestinyActivityDefinition" | "DestinyActivityTypeDefinition" | "DestinyClassDefinition" | "DestinyGenderDefinition" | "DestinyInventoryBucketDefinition" | "DestinyRaceDefinition" | "DestinyTalentGridDefinition" | "DestinyUnlockDefinition" | "DestinyMaterialRequirementSetDefinition" | "DestinySandboxPerkDefinition" | "DestinyStatGroupDefinition" | "DestinyProgressionMappingDefinition" | "DestinyFactionDefinition" | "DestinyVendorGroupDefinition" | "DestinyRewardSourceDefinition" | "DestinyUnlockValueDefinition" | "DestinyItemCategoryDefinition" | "DestinyDamageTypeDefinition" | "DestinyActivityModeDefinition" | "DestinyActivityGraphDefinition" | "DestinyCollectibleDefinition" | "DestinyStatDefinition" | "DestinyItemTierTypeDefinition" | "DestinyMetricDefinition" | "DestinyPlugSetDefinition" | "DestinyPresentationNodeDefinition" | "DestinyRecordDefinition" | "DestinyDestinationDefinition" | "DestinyEquipmentSlotDefinition" | "DestinyInventoryItemDefinition" | "DestinyLocationDefinition" | "DestinyLoreDefinition" | "DestinyObjectiveDefinition" | "DestinyProgressionDefinition" | "DestinyProgressionLevelRequirementDefinition" | "DestinySeasonDefinition" | "DestinySeasonPassDefinition" | "DestinySocketCategoryDefinition" | "DestinySocketTypeDefinition" | "DestinyTraitDefinition" | "DestinyTraitCategoryDefinition" | "DestinyVendorDefinition" | "DestinyMilestoneDefinition" | "DestinyActivityModifierDefinition" | "DestinyReportReasonCategoryDefinition" | "DestinyArtifactDefinition" | "DestinyBreakerTypeDefinition" | "DestinyChecklistDefinition" | "DestinyEnergyTypeDefinition">(componentName: K_1, filter?: ((entry: import("bungie-api-ts/destiny2").AllDestinyManifestComponents[K_1][number]) => boolean) | undefined) => import("bungie-api-ts/destiny2").AllDestinyManifestComponents[K_1][number][];
    /**
     * searches an entire manifest table, doing case-insenstive string matching.
     *
     * checks against name, description, progressDescription, statName, tierName.
     *
     * prefers matching search term to the entire word.
     *
     * prefers major item categories, trying to avoid weird same-named stuff like catalysts.
     */
    find: <K_2 extends "DestinyPlaceDefinition" | "DestinyActivityDefinition" | "DestinyActivityTypeDefinition" | "DestinyClassDefinition" | "DestinyGenderDefinition" | "DestinyInventoryBucketDefinition" | "DestinyRaceDefinition" | "DestinyTalentGridDefinition" | "DestinyUnlockDefinition" | "DestinyMaterialRequirementSetDefinition" | "DestinySandboxPerkDefinition" | "DestinyStatGroupDefinition" | "DestinyProgressionMappingDefinition" | "DestinyFactionDefinition" | "DestinyVendorGroupDefinition" | "DestinyRewardSourceDefinition" | "DestinyUnlockValueDefinition" | "DestinyItemCategoryDefinition" | "DestinyDamageTypeDefinition" | "DestinyActivityModeDefinition" | "DestinyActivityGraphDefinition" | "DestinyCollectibleDefinition" | "DestinyStatDefinition" | "DestinyItemTierTypeDefinition" | "DestinyMetricDefinition" | "DestinyPlugSetDefinition" | "DestinyPresentationNodeDefinition" | "DestinyRecordDefinition" | "DestinyDestinationDefinition" | "DestinyEquipmentSlotDefinition" | "DestinyInventoryItemDefinition" | "DestinyLocationDefinition" | "DestinyLoreDefinition" | "DestinyObjectiveDefinition" | "DestinyProgressionDefinition" | "DestinyProgressionLevelRequirementDefinition" | "DestinySeasonDefinition" | "DestinySeasonPassDefinition" | "DestinySocketCategoryDefinition" | "DestinySocketTypeDefinition" | "DestinyTraitDefinition" | "DestinyTraitCategoryDefinition" | "DestinyVendorDefinition" | "DestinyMilestoneDefinition" | "DestinyActivityModifierDefinition" | "DestinyReportReasonCategoryDefinition" | "DestinyArtifactDefinition" | "DestinyBreakerTypeDefinition" | "DestinyChecklistDefinition" | "DestinyEnergyTypeDefinition">(tableName: K_2, needle: string, tableFilter?: ((entry: import("bungie-api-ts/destiny2").AllDestinyManifestComponents[K_2][number]) => boolean) | undefined) => import("bungie-api-ts/destiny2").AllDestinyManifestComponents[K_2][number][];
    /**
     * loads a LOCAL manifest file (the most recent available) only. WILL NOT  update or DL if it's missing.
     * does not require the internet since you aren't checking the API version
     *
     * returns true if it managed to load a local version of the manifest
     *
     * synchronous!!!
     */
    loadLocal: (fromLoad?: boolean) => boolean;
    /**
     * loads the newest manifest according to what version the API advertises
     *
     * if the newest version is already cached locally, uses that. otherwise
     * downloads the manifest file from the internet
     */
    load: () => Promise<void>;
};
export default _default;
