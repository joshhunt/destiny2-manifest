// import {
//   DestinyManifestComponentName,
//   getAllDestinyManifestComponents,
//   getDestinyManifestComponent,
//   getDestinyManifestSlice,
// } from './api-ts-getter';

import { DestinyManifestComponentName, getAllDestinyManifestComponents, getDestinyManifestComponent, getDestinyManifestSlice } from 'bungie-api-ts/destiny2/manifest';

import { HttpClientConfig } from 'bungie-api-ts/http';
import fetch from 'cross-fetch';
import { getDestinyManifest } from 'bungie-api-ts/destiny2';

/**
 * given set of bungie-api-ts params (HttpClientConfig),
 * contacts the API and interprets results as JSON
 */
export function httpClient(config: HttpClientConfig) {
  return fetch(config.url, config)
    .then((res) => res.json())
    .catch((e) => {
      console.log('DESTINY API ERROR');
      console.log('probably about to fail a promise here. sorry.');
      console.log(console.log(e));
    });
}

/**
 * performs a 1-time fetch on script load, whose results we can
 * repeatedly refer back to if we need, by awaiting it
 */
export const manifestMetadataPromise = (async () => {
  const manifestMetadata = await manifestMetadataFetch();
  if (!manifestMetadata) process.exit(1);
  return manifestMetadata;
})();

/**
 * in case you're into weird stuff like re-querying the API for updated manifest info
 */
export async function manifestMetadataFetch() {
  const manifestMetadata = await getDestinyManifest(httpClient);
  return manifestMetadata.Response;
}

export async function getTable(
  language: string,
  tableName: DestinyManifestComponentName,
  ignoreIfVersion: string = '',
  verbose = false,
) {
  const manifestMetadata = await manifestMetadataPromise;
  const versionMismatch = ignoreIfVersion !== manifestMetadata.version;

  if (verbose)
    console.log(
      `${
        ignoreIfVersion && versionMismatch ? `bungie.net has a manifest version !== ${ignoreIfVersion} ` : ''
      }downloading version ${manifestMetadata.version}`,
    );
  return (
    versionMismatch && getDestinyManifestComponent(httpClient, { destinyManifest: manifestMetadata, tableName, language })
  );
}

export async function getAllTables(language: string, ignoreIfVersion: string = '', verbose = false) {
  const manifestMetadata = await manifestMetadataPromise;
  const alreadyUpdated = ignoreIfVersion === manifestMetadata.version;

  if (verbose) {
    console.log(`bungie.net has manifest version ${manifestMetadata.version}`);
    console.log(`we have version ${ignoreIfVersion}`);
    ignoreIfVersion && alreadyUpdated && console.log(`these match and we will skip download`);
    !ignoreIfVersion && console.log(`no instructions given to avoid performing a download`);
    ignoreIfVersion && !alreadyUpdated && console.log(`time to upgrade`);
    (!ignoreIfVersion || (ignoreIfVersion && !alreadyUpdated)) &&
      console.log(`about to download ${manifestMetadata.version}`);
  }
  return !alreadyUpdated && getAllDestinyManifestComponents(httpClient, { destinyManifest: manifestMetadata, language });
}

export async function getSomeTables<T extends DestinyManifestComponentName[]>(
  language: string,
  tableNames: T,
  ignoreIfVersion: string = '',
  verbose = false,
) {
  //: Promise<Pick<AllDestinyManifestComponents, T[number]> | false>
  const manifestMetadata = await manifestMetadataPromise;
  const versionMismatch = ignoreIfVersion !== manifestMetadata.version || null;

  if (verbose)
    console.log(
      `${
        ignoreIfVersion && versionMismatch ? `bungie.net has a manifest version !== ${ignoreIfVersion} ` : ''
      }downloading version ${manifestMetadata.version}`,
    );
  return (
    versionMismatch &&
    getDestinyManifestSlice(httpClient, { destinyManifest: manifestMetadata, tableNames, language })
  );
}

// async () => {
//   const tablesGot = await getSomeTables('en', ['DestinyMilestoneDefinition', 'DestinyActivityModifierDefinition']);
//   tablesGot && tablesGot.DestinyMilestoneDefinition && tablesGot.DestinyActivityDefinition;
// };

// const tablesToKeep = ['DestinyMilestoneDefinition' as const, 'DestinyActivityModifierDefinition' as const];

// function getTables<T extends (DestinyManifestComponentName)[]>(
//   tables: T,
// ): Promise<Pick<AllDestinyManifestComponents, T[number]>> {
//   return {} as any;
// }
// async () => {
//   const thing = await getTables(tablesToKeep);
//   thing.DestinyActivityModifierDefinition;
//   thing.DestinyObjectiveDefinition;
// };

//DestinyManifestComponentName = keyof AllDestinyManifestComponents;

// export type asdf = Pick<AllDestinyManifestComponents, typeof tablesToKeep[number]>;
// export interface GetSomeManifestTablesParams<T extends TableKeySet> {
//   destinyManifest: DestinyManifest;
//   tableNames: T;
//   language: string;
// }
// export async function getSomeDestinyManifestTables<T extends TableKeySet>(
//   http: HttpClient,
//   params: GetSomeManifestTablesParams<T>,
// )

// async () => {
//   const manifestMetadata = await manifestMetadataPromise;
//   const partialManifest = await getDestinyManifestSlice(httpClient, {
//     destinyManifest: manifestMetadata,
//     tableNames: ['DestinyInventoryItemDefinition', 'DestinyLocationDefinition'],
//     language: 'en',
//   });

//   partialManifest.DestinyInventoryItemDefinition;
//   partialManifest.DestinyLocationDefinition;
//   partialManifest.DestinyObjectiveDefinition;

//   const entry = partialManifest.DestinyInventoryItemDefinition[1127237110];

//   entry.displayProperties;
//   entry.displayPxxxxxties;
//   // Property 'displayPxxxxxties' does not exist on type 'DestinyInventoryItemDefinition'.ts(2339)


// };
