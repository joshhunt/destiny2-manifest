import { AllDestinyManifestComponents, DestinyDefinitionFrom, DestinyManifest } from 'bungie-api-ts/destiny2';
export declare type ManifestLanguage = 'en' | 'fr' | 'es' | 'es-mx' | 'de' | 'it' | 'ja' | 'pt-br' | 'ru' | 'pl' | 'ko' | 'zh-cht' | 'zh-chs';
export declare let language: ManifestLanguage;
export declare let isVerbose: boolean;
/** run this if you love console logs */
export declare const verbose: () => void;
/**
 * if you like doing things THE RIGHT WAY,
 * you should add an api key to httpClient
 */
export declare const setApiKey: (apiKey?: string | undefined) => void;
/**
 * change the language
 */
export declare const setLanguage: (lang: ManifestLanguage) => void;
/** await this for the current manifest metadata (version, paths) */
export declare let manifestMetadataPromise: Promise<DestinyManifest>;
/** you could run this to refresh manifest version, or after adding a api key */
export declare const fetchManifestMetadata: () => Promise<DestinyManifest>;
/**
 * you could access this directly,
 * if you're no fun and don't like my convenience functions
 *
 * it's the big old object with all manifest data in it
 */
export declare let allManifest: AllDestinyManifestComponents | undefined;
export declare const setManifest: (manifest: AllDestinyManifestComponents) => void;
/** stores the manifestVersion that we have cached */
export declare const setLoadedVersion: (version: string) => void;
/** which version is actually in the manifest variable */
export declare let loadedVersion: string;
/**
 * don't use this directly.
 *
 * `load()` from the browser or node version should automatically
 * deal with making sure we tried to get a cached version first,
 * loadedVersion is correct, etc.
 */
export declare const loadManifestFromApi: (forceUpdate?: boolean) => Promise<void>;
/** performs a lookup of a known hash */
export declare const get: <K extends "DestinyPlaceDefinition" | "DestinyActivityDefinition" | "DestinyActivityTypeDefinition" | "DestinyClassDefinition" | "DestinyGenderDefinition" | "DestinyInventoryBucketDefinition" | "DestinyRaceDefinition" | "DestinyTalentGridDefinition" | "DestinyUnlockDefinition" | "DestinyMaterialRequirementSetDefinition" | "DestinySandboxPerkDefinition" | "DestinyStatGroupDefinition" | "DestinyProgressionMappingDefinition" | "DestinyFactionDefinition" | "DestinyVendorGroupDefinition" | "DestinyRewardSourceDefinition" | "DestinyUnlockValueDefinition" | "DestinyItemCategoryDefinition" | "DestinyDamageTypeDefinition" | "DestinyActivityModeDefinition" | "DestinyActivityGraphDefinition" | "DestinyCollectibleDefinition" | "DestinyStatDefinition" | "DestinyItemTierTypeDefinition" | "DestinyMetricDefinition" | "DestinyPlugSetDefinition" | "DestinyPresentationNodeDefinition" | "DestinyRecordDefinition" | "DestinyDestinationDefinition" | "DestinyEquipmentSlotDefinition" | "DestinyInventoryItemDefinition" | "DestinyLocationDefinition" | "DestinyLoreDefinition" | "DestinyObjectiveDefinition" | "DestinyProgressionDefinition" | "DestinyProgressionLevelRequirementDefinition" | "DestinySeasonDefinition" | "DestinySeasonPassDefinition" | "DestinySocketCategoryDefinition" | "DestinySocketTypeDefinition" | "DestinyTraitDefinition" | "DestinyTraitCategoryDefinition" | "DestinyVendorDefinition" | "DestinyMilestoneDefinition" | "DestinyActivityModifierDefinition" | "DestinyReportReasonCategoryDefinition" | "DestinyArtifactDefinition" | "DestinyBreakerTypeDefinition" | "DestinyChecklistDefinition" | "DestinyEnergyTypeDefinition">(componentName: K, hash: number | string | undefined) => AllDestinyManifestComponents[K][number] | undefined;
/** returns an array of table contents */
export declare const getAll: <K extends "DestinyPlaceDefinition" | "DestinyActivityDefinition" | "DestinyActivityTypeDefinition" | "DestinyClassDefinition" | "DestinyGenderDefinition" | "DestinyInventoryBucketDefinition" | "DestinyRaceDefinition" | "DestinyTalentGridDefinition" | "DestinyUnlockDefinition" | "DestinyMaterialRequirementSetDefinition" | "DestinySandboxPerkDefinition" | "DestinyStatGroupDefinition" | "DestinyProgressionMappingDefinition" | "DestinyFactionDefinition" | "DestinyVendorGroupDefinition" | "DestinyRewardSourceDefinition" | "DestinyUnlockValueDefinition" | "DestinyItemCategoryDefinition" | "DestinyDamageTypeDefinition" | "DestinyActivityModeDefinition" | "DestinyActivityGraphDefinition" | "DestinyCollectibleDefinition" | "DestinyStatDefinition" | "DestinyItemTierTypeDefinition" | "DestinyMetricDefinition" | "DestinyPlugSetDefinition" | "DestinyPresentationNodeDefinition" | "DestinyRecordDefinition" | "DestinyDestinationDefinition" | "DestinyEquipmentSlotDefinition" | "DestinyInventoryItemDefinition" | "DestinyLocationDefinition" | "DestinyLoreDefinition" | "DestinyObjectiveDefinition" | "DestinyProgressionDefinition" | "DestinyProgressionLevelRequirementDefinition" | "DestinySeasonDefinition" | "DestinySeasonPassDefinition" | "DestinySocketCategoryDefinition" | "DestinySocketTypeDefinition" | "DestinyTraitDefinition" | "DestinyTraitCategoryDefinition" | "DestinyVendorDefinition" | "DestinyMilestoneDefinition" | "DestinyActivityModifierDefinition" | "DestinyReportReasonCategoryDefinition" | "DestinyArtifactDefinition" | "DestinyBreakerTypeDefinition" | "DestinyChecklistDefinition" | "DestinyEnergyTypeDefinition">(componentName: K, filter?: ((entry: AllDestinyManifestComponents[K][number]) => boolean) | undefined) => AllDestinyManifestComponents[K][number][];
/** returns a manifest component (a set of definitions keyed by hash number) */
export declare const getComponent: <K extends "DestinyPlaceDefinition" | "DestinyActivityDefinition" | "DestinyActivityTypeDefinition" | "DestinyClassDefinition" | "DestinyGenderDefinition" | "DestinyInventoryBucketDefinition" | "DestinyRaceDefinition" | "DestinyTalentGridDefinition" | "DestinyUnlockDefinition" | "DestinyMaterialRequirementSetDefinition" | "DestinySandboxPerkDefinition" | "DestinyStatGroupDefinition" | "DestinyProgressionMappingDefinition" | "DestinyFactionDefinition" | "DestinyVendorGroupDefinition" | "DestinyRewardSourceDefinition" | "DestinyUnlockValueDefinition" | "DestinyItemCategoryDefinition" | "DestinyDamageTypeDefinition" | "DestinyActivityModeDefinition" | "DestinyActivityGraphDefinition" | "DestinyCollectibleDefinition" | "DestinyStatDefinition" | "DestinyItemTierTypeDefinition" | "DestinyMetricDefinition" | "DestinyPlugSetDefinition" | "DestinyPresentationNodeDefinition" | "DestinyRecordDefinition" | "DestinyDestinationDefinition" | "DestinyEquipmentSlotDefinition" | "DestinyInventoryItemDefinition" | "DestinyLocationDefinition" | "DestinyLoreDefinition" | "DestinyObjectiveDefinition" | "DestinyProgressionDefinition" | "DestinyProgressionLevelRequirementDefinition" | "DestinySeasonDefinition" | "DestinySeasonPassDefinition" | "DestinySocketCategoryDefinition" | "DestinySocketTypeDefinition" | "DestinyTraitDefinition" | "DestinyTraitCategoryDefinition" | "DestinyVendorDefinition" | "DestinyMilestoneDefinition" | "DestinyActivityModifierDefinition" | "DestinyReportReasonCategoryDefinition" | "DestinyArtifactDefinition" | "DestinyBreakerTypeDefinition" | "DestinyChecklistDefinition" | "DestinyEnergyTypeDefinition">(componentName: K) => AllDestinyManifestComponents[K];
export declare const find: <K extends "DestinyPlaceDefinition" | "DestinyActivityDefinition" | "DestinyActivityTypeDefinition" | "DestinyClassDefinition" | "DestinyGenderDefinition" | "DestinyInventoryBucketDefinition" | "DestinyRaceDefinition" | "DestinyTalentGridDefinition" | "DestinyUnlockDefinition" | "DestinyMaterialRequirementSetDefinition" | "DestinySandboxPerkDefinition" | "DestinyStatGroupDefinition" | "DestinyProgressionMappingDefinition" | "DestinyFactionDefinition" | "DestinyVendorGroupDefinition" | "DestinyRewardSourceDefinition" | "DestinyUnlockValueDefinition" | "DestinyItemCategoryDefinition" | "DestinyDamageTypeDefinition" | "DestinyActivityModeDefinition" | "DestinyActivityGraphDefinition" | "DestinyCollectibleDefinition" | "DestinyStatDefinition" | "DestinyItemTierTypeDefinition" | "DestinyMetricDefinition" | "DestinyPlugSetDefinition" | "DestinyPresentationNodeDefinition" | "DestinyRecordDefinition" | "DestinyDestinationDefinition" | "DestinyEquipmentSlotDefinition" | "DestinyInventoryItemDefinition" | "DestinyLocationDefinition" | "DestinyLoreDefinition" | "DestinyObjectiveDefinition" | "DestinyProgressionDefinition" | "DestinyProgressionLevelRequirementDefinition" | "DestinySeasonDefinition" | "DestinySeasonPassDefinition" | "DestinySocketCategoryDefinition" | "DestinySocketTypeDefinition" | "DestinyTraitDefinition" | "DestinyTraitCategoryDefinition" | "DestinyVendorDefinition" | "DestinyMilestoneDefinition" | "DestinyActivityModifierDefinition" | "DestinyReportReasonCategoryDefinition" | "DestinyArtifactDefinition" | "DestinyBreakerTypeDefinition" | "DestinyChecklistDefinition" | "DestinyEnergyTypeDefinition">(tableName: K, needle: string, tableFilter?: ((entry: AllDestinyManifestComponents[K][number]) => boolean) | undefined) => AllDestinyManifestComponents[K][number][];
declare const _default: {
    /**
     * if you like doing things THE RIGHT WAY,
     * you should add an api key to httpClient
     */
    setApiKey: (apiKey?: string | undefined) => void;
    /** run this if you love console logs */
    verbose: () => void;
    language: "en";
    /**
     * don't use this.
     *
     * `update()` from the browser or node version should automatically
     * deal with making sure something is loaded, we've updated
     * version numbers, etc.
     */
    load: (forceUpdate?: boolean) => Promise<void>;
    /** performs a lookup of a known hash */
    get: <K extends "DestinyPlaceDefinition" | "DestinyActivityDefinition" | "DestinyActivityTypeDefinition" | "DestinyClassDefinition" | "DestinyGenderDefinition" | "DestinyInventoryBucketDefinition" | "DestinyRaceDefinition" | "DestinyTalentGridDefinition" | "DestinyUnlockDefinition" | "DestinyMaterialRequirementSetDefinition" | "DestinySandboxPerkDefinition" | "DestinyStatGroupDefinition" | "DestinyProgressionMappingDefinition" | "DestinyFactionDefinition" | "DestinyVendorGroupDefinition" | "DestinyRewardSourceDefinition" | "DestinyUnlockValueDefinition" | "DestinyItemCategoryDefinition" | "DestinyDamageTypeDefinition" | "DestinyActivityModeDefinition" | "DestinyActivityGraphDefinition" | "DestinyCollectibleDefinition" | "DestinyStatDefinition" | "DestinyItemTierTypeDefinition" | "DestinyMetricDefinition" | "DestinyPlugSetDefinition" | "DestinyPresentationNodeDefinition" | "DestinyRecordDefinition" | "DestinyDestinationDefinition" | "DestinyEquipmentSlotDefinition" | "DestinyInventoryItemDefinition" | "DestinyLocationDefinition" | "DestinyLoreDefinition" | "DestinyObjectiveDefinition" | "DestinyProgressionDefinition" | "DestinyProgressionLevelRequirementDefinition" | "DestinySeasonDefinition" | "DestinySeasonPassDefinition" | "DestinySocketCategoryDefinition" | "DestinySocketTypeDefinition" | "DestinyTraitDefinition" | "DestinyTraitCategoryDefinition" | "DestinyVendorDefinition" | "DestinyMilestoneDefinition" | "DestinyActivityModifierDefinition" | "DestinyReportReasonCategoryDefinition" | "DestinyArtifactDefinition" | "DestinyBreakerTypeDefinition" | "DestinyChecklistDefinition" | "DestinyEnergyTypeDefinition">(componentName: K, hash: string | number | undefined) => AllDestinyManifestComponents[K][number] | undefined;
    /** returns an array of table contents */
    getAll: <K_1 extends "DestinyPlaceDefinition" | "DestinyActivityDefinition" | "DestinyActivityTypeDefinition" | "DestinyClassDefinition" | "DestinyGenderDefinition" | "DestinyInventoryBucketDefinition" | "DestinyRaceDefinition" | "DestinyTalentGridDefinition" | "DestinyUnlockDefinition" | "DestinyMaterialRequirementSetDefinition" | "DestinySandboxPerkDefinition" | "DestinyStatGroupDefinition" | "DestinyProgressionMappingDefinition" | "DestinyFactionDefinition" | "DestinyVendorGroupDefinition" | "DestinyRewardSourceDefinition" | "DestinyUnlockValueDefinition" | "DestinyItemCategoryDefinition" | "DestinyDamageTypeDefinition" | "DestinyActivityModeDefinition" | "DestinyActivityGraphDefinition" | "DestinyCollectibleDefinition" | "DestinyStatDefinition" | "DestinyItemTierTypeDefinition" | "DestinyMetricDefinition" | "DestinyPlugSetDefinition" | "DestinyPresentationNodeDefinition" | "DestinyRecordDefinition" | "DestinyDestinationDefinition" | "DestinyEquipmentSlotDefinition" | "DestinyInventoryItemDefinition" | "DestinyLocationDefinition" | "DestinyLoreDefinition" | "DestinyObjectiveDefinition" | "DestinyProgressionDefinition" | "DestinyProgressionLevelRequirementDefinition" | "DestinySeasonDefinition" | "DestinySeasonPassDefinition" | "DestinySocketCategoryDefinition" | "DestinySocketTypeDefinition" | "DestinyTraitDefinition" | "DestinyTraitCategoryDefinition" | "DestinyVendorDefinition" | "DestinyMilestoneDefinition" | "DestinyActivityModifierDefinition" | "DestinyReportReasonCategoryDefinition" | "DestinyArtifactDefinition" | "DestinyBreakerTypeDefinition" | "DestinyChecklistDefinition" | "DestinyEnergyTypeDefinition">(componentName: K_1, filter?: ((entry: AllDestinyManifestComponents[K_1][number]) => boolean) | undefined) => AllDestinyManifestComponents[K_1][number][];
    /**
     * searches an entire manifest table, doing case-insenstive string matching.
     *
     * checks against name, description, progressDescription, statName, tierName.
     *
     * prefers matching search term to the entire word.
     *
     * prefers major item categories, trying to avoid weird same-named stuff like catalysts.
     */
    find: <K_2 extends "DestinyPlaceDefinition" | "DestinyActivityDefinition" | "DestinyActivityTypeDefinition" | "DestinyClassDefinition" | "DestinyGenderDefinition" | "DestinyInventoryBucketDefinition" | "DestinyRaceDefinition" | "DestinyTalentGridDefinition" | "DestinyUnlockDefinition" | "DestinyMaterialRequirementSetDefinition" | "DestinySandboxPerkDefinition" | "DestinyStatGroupDefinition" | "DestinyProgressionMappingDefinition" | "DestinyFactionDefinition" | "DestinyVendorGroupDefinition" | "DestinyRewardSourceDefinition" | "DestinyUnlockValueDefinition" | "DestinyItemCategoryDefinition" | "DestinyDamageTypeDefinition" | "DestinyActivityModeDefinition" | "DestinyActivityGraphDefinition" | "DestinyCollectibleDefinition" | "DestinyStatDefinition" | "DestinyItemTierTypeDefinition" | "DestinyMetricDefinition" | "DestinyPlugSetDefinition" | "DestinyPresentationNodeDefinition" | "DestinyRecordDefinition" | "DestinyDestinationDefinition" | "DestinyEquipmentSlotDefinition" | "DestinyInventoryItemDefinition" | "DestinyLocationDefinition" | "DestinyLoreDefinition" | "DestinyObjectiveDefinition" | "DestinyProgressionDefinition" | "DestinyProgressionLevelRequirementDefinition" | "DestinySeasonDefinition" | "DestinySeasonPassDefinition" | "DestinySocketCategoryDefinition" | "DestinySocketTypeDefinition" | "DestinyTraitDefinition" | "DestinyTraitCategoryDefinition" | "DestinyVendorDefinition" | "DestinyMilestoneDefinition" | "DestinyActivityModifierDefinition" | "DestinyReportReasonCategoryDefinition" | "DestinyArtifactDefinition" | "DestinyBreakerTypeDefinition" | "DestinyChecklistDefinition" | "DestinyEnergyTypeDefinition">(tableName: K_2, needle: string, tableFilter?: ((entry: AllDestinyManifestComponents[K_2][number]) => boolean) | undefined) => AllDestinyManifestComponents[K_2][number][];
};
export default _default;
