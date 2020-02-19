import * as fs from 'fs';
import axios from 'axios';
import { sep } from 'path';

const preferredCategories = [1, 20, 18, 19, 16, 34, 35, 39, 42, 43, 44, 53, 1784235469, 2088636411];

/**
 * FEED ME A STRAY API TOKEN
 */
export default class D2Manifest {
  apiToken: string;
  language: string;
  verbose: boolean;
  manifestsPath: string;
  manifest: DestinyJSONManifest | undefined;
  /**
   * @param apiToken api token for bungie.net
   * @param language en (default) / fr / es / es-mx / de / it / ja / pt-br / ru / pl / ko / zh-cht / zh-chs
   * @param verbose console log steps during async methods
   * @param manifestsPath where to store/load manifests (default "./manifest")
   */
  constructor(
    apiToken: string,
    language: string = 'en',
    verbose: boolean = false,
    manifestsPath: string = `.${sep}manifest${sep}`,
  ) {
    this.apiToken = apiToken;
    this.language = language;
    this.verbose = verbose;
    this.manifestsPath = manifestsPath;
  }

  /**
   * loads the ALREADY saved manifest file
   * update()s one from the internet if none is found
   */
  async load() {
    if (!fs.existsSync(this.manifestsPath)) fs.mkdirSync(this.manifestsPath);
    const latestManifest = this.latest();
    if (latestManifest) {
      this.verbose && console.log(`loading latest saved manifest: ${latestManifest}`);
      try {
        this.manifest = JSON.parse(fs.readFileSync(this.manifestsPath + latestManifest, 'utf8'));
        this.verbose && console.log('manifest loaded');
      } catch (e) {
        console.log(e);
      }
    } else {
      this.verbose && console.log('no latest manifest found. updating to get one.');
      await this.update();
    }
  }
  latest() {
    const manifestsByVersion = fs.readdirSync(this.manifestsPath).sort((a, b) => {
      const a_ = a.split(/[-.]/);
      const b_ = b.split(/[-.]/);
      for (var i = 0; i < a_.length; i++) {
        let comparison = Number(a_[i]) - Number(b_[i]);
        if (comparison) return comparison;
      }
      return 0;
    });
    return manifestsByVersion[0];
  }

  /**
   * checks bungie.net for the current manifest version
   * downloads a copy if there's a newer version than saved
   * always load()s the newest manifest afterward
   */
  async update() {
    if (!fs.existsSync(this.manifestsPath)) fs.mkdirSync(this.manifestsPath, { recursive: true });
    try {
      const manifestList: DestinyManifest = (
        await axios.get('http://www.bungie.net/platform/Destiny2/Manifest/', {
          headers: { 'X-API-Key': this.apiToken },
        })
      ).data.Response;
      const latestManifest = this.latest();
      this.verbose && console.log(`saved: ${latestManifest} -- bungie.net: ${manifestList.version}`);
      if (manifestList.version + '.json' === latestManifest) {
        this.verbose && console.log('manifest already up to date');
      } else {
        var newManifestFile = fs.createWriteStream(this.manifestsPath + manifestList.version + '.json');
        var writeFinished = new Promise(function(resolve, reject) {
          newManifestFile.on('close', resolve);
          newManifestFile.on('error', reject);
        });
        await axios
          .get(`https://www.bungie.net${manifestList.jsonWorldContentPaths[this.language]}`, {
            responseType: 'stream',
          })
          .then((response) => {
            response.data.pipe(newManifestFile);
          });
        await writeFinished;
        this.verbose && console.log('manifest updated. loading update.');
        await this.load();
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * searches an entire manifest table, doing case-insenstive string matching.
   * checks against name, description, progressDescription, statName, tierName.
   * prefers matching search term to the entire word.
   * prefers major item categories, trying to avoid weird same-named stuff like catalysts.
   */
  find<K extends keyof DestinyJSONManifest>(tableName: K, needle: string, tableFilter?: (entry: any) => boolean) {
    let searchResults: DestinyDefinitionFrom<K>[] = [];
    let needles: RegExp[];
    try {
      needles = [new RegExp(`\\b${needle}\\b`, 'i'), new RegExp(needle, 'i'), new RegExp(escapeRegExp(needle), 'i')];
    } catch {
      this.verbose && console.log('that regex did not go well. trying simpler.');
      needles = [new RegExp(`\\b${escapeRegExp(needle)}\\b`, 'i'), new RegExp(escapeRegExp(needle), 'i')];
    }
    searching: {
      const searchFields = [name, description, progressDescription, statName, tierName];
      for (const needleRegex of needles) {
        for (const searchField of searchFields) {
          searchResults = this.getAll(tableName)
            .filter(tableFilter ? tableFilter : () => true)
            .filter((item) => needleRegex.test(searchField(item)));
          if (searchResults.length) break searching;
        }
      }
    }
    const filteredSearchResults = searchResults.filter(
      (item) => !isItem(item) || item.itemCategoryHashes?.some((hash) => preferredCategories.includes(hash)),
    );

    const finalSearchResults = filteredSearchResults.length ? filteredSearchResults : searchResults;
    return finalSearchResults;
  }

  /** performs a lookup of a known hash */
  get<K extends DestinyManifestTableName>(
    tableName: K,
    hash: number | undefined,
  ): DestinyDefinitionFrom<K> | undefined {
    return this.manifest?.[tableName][hash ?? -99999999];
  }

  /** returns an array of table contents */
  getAll<K extends DestinyManifestTableName>(
    tableName: K,
    tableFilter?: (entry: any) => boolean,
  ): DestinyJSONManifest[K][number][] {
    return Object.values(this.manifest?.[tableName] ?? {}).filter(tableFilter ? tableFilter : () => true);
  }
}

function name(entry: any) {
  return entry?.displayProperties?.name ?? '';
}
function description(entry: any) {
  return entry?.displayProperties?.description ?? '';
}
function progressDescription(entry: any) {
  return entry?.progressDescription ?? '';
}
function statName(entry: any) {
  return entry?.statName ?? '';
}
function tierName(entry: any) {
  return entry?.tierName ?? '';
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isItem(entry: any): entry is DestinyInventoryItemDefinition {
  return entry.itemCategoryHashes !== undefined;
}

import {
  DestinyPlaceDefinition,
  DestinyActivityDefinition,
  DestinyActivityTypeDefinition,
  DestinyClassDefinition,
  DestinyGenderDefinition,
  DestinyInventoryBucketDefinition,
  DestinyRaceDefinition,
  DestinyTalentGridDefinition,
  DestinyUnlockDefinition,
  DestinyMaterialRequirementSetDefinition,
  DestinySandboxPerkDefinition,
  DestinyStatGroupDefinition,
  DestinyProgressionMappingDefinition,
  DestinyFactionDefinition,
  DestinyVendorGroupDefinition,
  DestinyRewardSourceDefinition,
  DestinyUnlockValueDefinition,
  DestinyItemCategoryDefinition,
  DestinyDamageTypeDefinition,
  DestinyActivityModeDefinition,
  DestinyActivityGraphDefinition,
  DestinyCollectibleDefinition,
  DestinyStatDefinition,
  DestinyItemTierTypeDefinition,
  DestinyPlugSetDefinition,
  DestinyPresentationNodeDefinition,
  DestinyRecordDefinition,
  DestinyDestinationDefinition,
  DestinyEquipmentSlotDefinition,
  DestinyInventoryItemDefinition,
  DestinyLocationDefinition,
  DestinyLoreDefinition,
  DestinyObjectiveDefinition,
  DestinyProgressionDefinition,
  DestinyProgressionLevelRequirementDefinition,
  DestinySeasonDefinition,
  DestinySeasonPassDefinition,
  DestinySocketCategoryDefinition,
  DestinySocketTypeDefinition,
  DestinyVendorDefinition,
  DestinyMilestoneDefinition,
  DestinyActivityModifierDefinition,
  DestinyReportReasonCategoryDefinition,
  DestinyArtifactDefinition,
  DestinyBreakerTypeDefinition,
  DestinyChecklistDefinition,
  DestinyEnergyTypeDefinition,
  DestinyManifest,
} from 'bungie-api-ts/destiny2';

interface DestinyJSONManifest {
  DestinyPlaceDefinition: { [key: number]: DestinyPlaceDefinition };
  DestinyActivityDefinition: { [key: number]: DestinyActivityDefinition };
  DestinyActivityTypeDefinition: { [key: number]: DestinyActivityTypeDefinition };
  DestinyClassDefinition: { [key: number]: DestinyClassDefinition };
  DestinyGenderDefinition: { [key: number]: DestinyGenderDefinition };
  DestinyInventoryBucketDefinition: { [key: number]: DestinyInventoryBucketDefinition };
  DestinyRaceDefinition: { [key: number]: DestinyRaceDefinition };
  DestinyTalentGridDefinition: { [key: number]: DestinyTalentGridDefinition };
  DestinyUnlockDefinition: { [key: number]: DestinyUnlockDefinition };
  DestinyMaterialRequirementSetDefinition: {
    [key: number]: DestinyMaterialRequirementSetDefinition;
  };
  DestinySandboxPerkDefinition: { [key: number]: DestinySandboxPerkDefinition };
  DestinyStatGroupDefinition: { [key: number]: DestinyStatGroupDefinition };
  DestinyProgressionMappingDefinition: { [key: number]: DestinyProgressionMappingDefinition };
  DestinyFactionDefinition: { [key: number]: DestinyFactionDefinition };
  DestinyVendorGroupDefinition: { [key: number]: DestinyVendorGroupDefinition };
  DestinyRewardSourceDefinition: { [key: number]: DestinyRewardSourceDefinition };
  DestinyUnlockValueDefinition: { [key: number]: DestinyUnlockValueDefinition };
  DestinyItemCategoryDefinition: { [key: number]: DestinyItemCategoryDefinition };
  DestinyDamageTypeDefinition: { [key: number]: DestinyDamageTypeDefinition };
  DestinyActivityModeDefinition: { [key: number]: DestinyActivityModeDefinition };
  DestinyActivityGraphDefinition: { [key: number]: DestinyActivityGraphDefinition };
  DestinyCollectibleDefinition: { [key: number]: DestinyCollectibleDefinition };
  DestinyStatDefinition: { [key: number]: DestinyStatDefinition };
  DestinyItemTierTypeDefinition: { [key: number]: DestinyItemTierTypeDefinition };
  DestinyPlugSetDefinition: { [key: number]: DestinyPlugSetDefinition };
  DestinyPresentationNodeDefinition: { [key: number]: DestinyPresentationNodeDefinition };
  DestinyRecordDefinition: { [key: number]: DestinyRecordDefinition };
  DestinyDestinationDefinition: { [key: number]: DestinyDestinationDefinition };
  DestinyEquipmentSlotDefinition: { [key: number]: DestinyEquipmentSlotDefinition };
  DestinyInventoryItemDefinition: { [key: number]: DestinyInventoryItemDefinition };
  DestinyLocationDefinition: { [key: number]: DestinyLocationDefinition };
  DestinyLoreDefinition: { [key: number]: DestinyLoreDefinition };
  DestinyObjectiveDefinition: { [key: number]: DestinyObjectiveDefinition };
  DestinyProgressionDefinition: { [key: number]: DestinyProgressionDefinition };
  DestinyProgressionLevelRequirementDefinition: {
    [key: number]: DestinyProgressionLevelRequirementDefinition;
  };
  DestinySeasonDefinition: { [key: number]: DestinySeasonDefinition };
  DestinySeasonPassDefinition: { [key: number]: DestinySeasonPassDefinition };
  DestinySocketCategoryDefinition: { [key: number]: DestinySocketCategoryDefinition };
  DestinySocketTypeDefinition: { [key: number]: DestinySocketTypeDefinition };
  DestinyVendorDefinition: { [key: number]: DestinyVendorDefinition };
  DestinyMilestoneDefinition: { [key: number]: DestinyMilestoneDefinition };
  DestinyActivityModifierDefinition: { [key: number]: DestinyActivityModifierDefinition };
  DestinyReportReasonCategoryDefinition: { [key: number]: DestinyReportReasonCategoryDefinition };
  DestinyArtifactDefinition: { [key: number]: DestinyArtifactDefinition };
  DestinyBreakerTypeDefinition: { [key: number]: DestinyBreakerTypeDefinition };
  DestinyChecklistDefinition: { [key: number]: DestinyChecklistDefinition };
  DestinyEnergyTypeDefinition: { [key: number]: DestinyEnergyTypeDefinition };
}
type DestinyManifestTableName = keyof DestinyJSONManifest;
type DestinyDefinitionFrom<K extends DestinyManifestTableName> = DestinyJSONManifest[K][number];
