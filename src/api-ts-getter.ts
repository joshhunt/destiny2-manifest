// this will be rolled into bungie-api-ts i hope

import {
  DestinyActivityDefinition,
  DestinyActivityGraphDefinition,
  DestinyActivityModeDefinition,
  DestinyActivityModifierDefinition,
  DestinyActivityTypeDefinition,
  DestinyArtifactDefinition,
  DestinyBreakerTypeDefinition,
  DestinyChecklistDefinition,
  DestinyClassDefinition,
  DestinyCollectibleDefinition,
  DestinyDamageTypeDefinition,
  DestinyDestinationDefinition,
  DestinyEnergyTypeDefinition,
  DestinyEquipmentSlotDefinition,
  DestinyFactionDefinition,
  DestinyGenderDefinition,
  DestinyInventoryBucketDefinition,
  DestinyInventoryItemDefinition,
  DestinyItemCategoryDefinition,
  DestinyItemTierTypeDefinition,
  DestinyLocationDefinition,
  DestinyLoreDefinition,
  DestinyManifest,
  DestinyMaterialRequirementSetDefinition,
  DestinyMetricDefinition,
  DestinyMilestoneDefinition,
  DestinyObjectiveDefinition,
  DestinyPlaceDefinition,
  DestinyPlugSetDefinition,
  DestinyPresentationNodeDefinition,
  DestinyProgressionDefinition,
  DestinyProgressionLevelRequirementDefinition,
  DestinyProgressionMappingDefinition,
  DestinyRaceDefinition,
  DestinyRecordDefinition,
  DestinyReportReasonCategoryDefinition,
  DestinyRewardSourceDefinition,
  DestinySandboxPerkDefinition,
  DestinySeasonDefinition,
  DestinySeasonPassDefinition,
  DestinySocketCategoryDefinition,
  DestinySocketTypeDefinition,
  DestinyStatDefinition,
  DestinyStatGroupDefinition,
  DestinyTalentGridDefinition,
  DestinyTraitCategoryDefinition,
  DestinyTraitDefinition,
  DestinyUnlockDefinition,
  DestinyUnlockValueDefinition,
  DestinyVendorDefinition,
  DestinyVendorGroupDefinition,
  HttpClient,
} from 'bungie-api-ts/destiny2';

/**
 * this describes a big object holding several tables of hash-keyed DestinyDefinitions
 * this is roughly what you get if you decode the gigantic, single-json manifest blob,
 * but also just what we use to dole out single-table, typed definitions
 */
export interface DestinyManifestStructure {
  DestinyPlaceDefinition: {
    [key: number]: DestinyPlaceDefinition;
  };
  DestinyActivityDefinition: {
    [key: number]: DestinyActivityDefinition;
  };
  DestinyActivityTypeDefinition: {
    [key: number]: DestinyActivityTypeDefinition;
  };
  DestinyClassDefinition: {
    [key: number]: DestinyClassDefinition;
  };
  DestinyGenderDefinition: {
    [key: number]: DestinyGenderDefinition;
  };
  DestinyInventoryBucketDefinition: {
    [key: number]: DestinyInventoryBucketDefinition;
  };
  DestinyRaceDefinition: {
    [key: number]: DestinyRaceDefinition;
  };
  DestinyTalentGridDefinition: {
    [key: number]: DestinyTalentGridDefinition;
  };
  DestinyUnlockDefinition: {
    [key: number]: DestinyUnlockDefinition;
  };
  DestinyMaterialRequirementSetDefinition: {
    [key: number]: DestinyMaterialRequirementSetDefinition;
  };
  DestinySandboxPerkDefinition: {
    [key: number]: DestinySandboxPerkDefinition;
  };
  DestinyStatGroupDefinition: {
    [key: number]: DestinyStatGroupDefinition;
  };
  DestinyProgressionMappingDefinition: {
    [key: number]: DestinyProgressionMappingDefinition;
  };
  DestinyFactionDefinition: {
    [key: number]: DestinyFactionDefinition;
  };
  DestinyVendorGroupDefinition: {
    [key: number]: DestinyVendorGroupDefinition;
  };
  DestinyRewardSourceDefinition: {
    [key: number]: DestinyRewardSourceDefinition;
  };
  DestinyUnlockValueDefinition: {
    [key: number]: DestinyUnlockValueDefinition;
  };
  DestinyItemCategoryDefinition: {
    [key: number]: DestinyItemCategoryDefinition;
  };
  DestinyDamageTypeDefinition: {
    [key: number]: DestinyDamageTypeDefinition;
  };
  DestinyActivityModeDefinition: {
    [key: number]: DestinyActivityModeDefinition;
  };
  DestinyActivityGraphDefinition: {
    [key: number]: DestinyActivityGraphDefinition;
  };
  DestinyCollectibleDefinition: {
    [key: number]: DestinyCollectibleDefinition;
  };
  DestinyStatDefinition: {
    [key: number]: DestinyStatDefinition;
  };
  DestinyItemTierTypeDefinition: {
    [key: number]: DestinyItemTierTypeDefinition;
  };
  DestinyMetricDefinition: {
    [key: number]: DestinyMetricDefinition;
  };
  DestinyPlugSetDefinition: {
    [key: number]: DestinyPlugSetDefinition;
  };
  DestinyPresentationNodeDefinition: {
    [key: number]: DestinyPresentationNodeDefinition;
  };
  DestinyRecordDefinition: {
    [key: number]: DestinyRecordDefinition;
  };
  DestinyDestinationDefinition: {
    [key: number]: DestinyDestinationDefinition;
  };
  DestinyEquipmentSlotDefinition: {
    [key: number]: DestinyEquipmentSlotDefinition;
  };
  DestinyInventoryItemDefinition: {
    [key: number]: DestinyInventoryItemDefinition;
  };
  DestinyLocationDefinition: {
    [key: number]: DestinyLocationDefinition;
  };
  DestinyLoreDefinition: {
    [key: number]: DestinyLoreDefinition;
  };
  DestinyObjectiveDefinition: {
    [key: number]: DestinyObjectiveDefinition;
  };
  DestinyProgressionDefinition: {
    [key: number]: DestinyProgressionDefinition;
  };
  DestinyProgressionLevelRequirementDefinition: {
    [key: number]: DestinyProgressionLevelRequirementDefinition;
  };
  DestinySeasonDefinition: {
    [key: number]: DestinySeasonDefinition;
  };
  DestinySeasonPassDefinition: {
    [key: number]: DestinySeasonPassDefinition;
  };
  DestinySocketCategoryDefinition: {
    [key: number]: DestinySocketCategoryDefinition;
  };
  DestinySocketTypeDefinition: {
    [key: number]: DestinySocketTypeDefinition;
  };
  DestinyTraitDefinition: {
    [key: number]: DestinyTraitDefinition;
  };
  DestinyTraitCategoryDefinition: {
    [key: number]: DestinyTraitCategoryDefinition;
  };
  DestinyVendorDefinition: {
    [key: number]: DestinyVendorDefinition;
  };
  DestinyMilestoneDefinition: {
    [key: number]: DestinyMilestoneDefinition;
  };
  DestinyActivityModifierDefinition: {
    [key: number]: DestinyActivityModifierDefinition;
  };
  DestinyReportReasonCategoryDefinition: {
    [key: number]: DestinyReportReasonCategoryDefinition;
  };
  DestinyArtifactDefinition: {
    [key: number]: DestinyArtifactDefinition;
  };
  DestinyBreakerTypeDefinition: {
    [key: number]: DestinyBreakerTypeDefinition;
  };
  DestinyChecklistDefinition: {
    [key: number]: DestinyChecklistDefinition;
  };
  DestinyEnergyTypeDefinition: {
    [key: number]: DestinyEnergyTypeDefinition;
  };
}

export type DestinyManifestTableName = keyof DestinyManifestStructure;
/**
 * given a STRING table name, this gives the type of an entry from that table
 * so that this will work:
 *
 * function f<K extends DestinyManifestTableName>(arg0:K):DestinyDefinitionFrom<K>{...}
 * i.e.
 * f('DestinyInventoryItemDefinition') will return type DestinyInventoryItemDefinition
 */
export type DestinyDefinitionFrom<K extends DestinyManifestTableName> = DestinyManifestStructure[K][number];



export interface GetAllManifestTablesParams {
  destinyManifest: DestinyManifest;
  language: string;
}

export interface GetManifestTableParams<T extends DestinyManifestTableName> {
  destinyManifest: DestinyManifest;
  tableName: T;
  language: string;
}


/** fetches the enormous combined JSON manifest file */
export function getAllDestinyManifestTables(http: HttpClient, params: GetAllManifestTablesParams) {
  return http({
    method: 'GET',
    url: `https://www.bungie.net${
      params.destinyManifest.jsonWorldContentPaths[params.language]
    }`,
  });
}

/** fetches and returns a single table (Component) from the d2 manifest */
export function getDestinyManifestTable<T extends DestinyManifestTableName>(http: HttpClient, params: GetManifestTableParams<T>) {
  return http({
    method: 'GET',
    url: `https://www.bungie.net${
      params.destinyManifest.jsonWorldComponentContentPaths[params.language][params.tableName]
    }`,
  });
}