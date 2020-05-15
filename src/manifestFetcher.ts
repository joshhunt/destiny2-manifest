import { DestinyManifest, getDestinyManifest } from 'bungie-api-ts/destiny2';
import {
  DestinyManifestComponentName,
  getAllDestinyManifestComponents,
  getDestinyManifestComponent,
  getDestinyManifestSlice,
} from 'bungie-api-ts/destiny2/manifest';

import { HttpClient } from 'bungie-api-ts/http';
import fetch from 'cross-fetch';
import { generateHttpClient } from 'destiny2-utils/api';
import { neverResolve } from '@sundevour/utils';

export const httpClient: HttpClient = generateHttpClient(fetch);

/**
 * small object with a promise to get API manifest version & paths,
 * and a dispatcher that adds the token in and initiates the request.
 * lives in its own object so we can refer to its results repeatedly,
 * without re-dispatching the request to the api.
 */
export const manifestMetadataFetcher = {
  promise: neverResolve() as Promise<DestinyManifest>,
  dispatch: function(token: string) {
    this.promise = (async () => {
      const fetchedData = await manifestMetadataFetch();
      return fetchedData;
    })();
    return this.promise;
  },
};

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
  const manifestMetadata = await manifestMetadataFetcher.promise;
  const versionMismatch = ignoreIfVersion !== manifestMetadata.version;

  if (verbose)
    console.log(
      `${
        ignoreIfVersion && versionMismatch ? `bungie.net has a manifest version !== ${ignoreIfVersion} ` : ''
      }downloading version ${manifestMetadata.version}`,
    );
  return (
    versionMismatch &&
    getDestinyManifestComponent(httpClient, { destinyManifest: manifestMetadata, tableName, language })
  );
}

export async function getAllTables(language: string, ignoreIfVersion: string = '', verbose = false) {
  const manifestMetadata = await manifestMetadataFetcher.promise;
  const alreadyUpdated = ignoreIfVersion === manifestMetadata.version;

  if (verbose) {
    console.log(`bungie.net has manifest version "${manifestMetadata.version}"`);
    console.log(`we have version "${ignoreIfVersion}"`);
    ignoreIfVersion && alreadyUpdated && console.log(`these match and we will skip download`);
    !ignoreIfVersion && console.log(`no instructions given to avoid performing a download`);
    ignoreIfVersion && !alreadyUpdated && console.log(`time to upgrade`);
    (!ignoreIfVersion || (ignoreIfVersion && !alreadyUpdated)) &&
      console.log(`about to download ${manifestMetadata.version}`);
  }
  return (
    !alreadyUpdated && getAllDestinyManifestComponents(httpClient, { destinyManifest: manifestMetadata, language })
  );
}

export async function getSomeTables<T extends DestinyManifestComponentName[]>(
  language: string,
  tableNames: T,
  ignoreIfVersion: string = '',
  verbose = false,
) {
  //: Promise<Pick<AllDestinyManifestComponents, T[number]> | false>
  const manifestMetadata = await manifestMetadataFetcher.promise;
  const versionMismatch = ignoreIfVersion !== manifestMetadata.version || null;

  if (verbose)
    console.log(
      `${
        ignoreIfVersion && versionMismatch ? `bungie.net has a manifest version !== ${ignoreIfVersion} ` : ''
      }downloading version ${manifestMetadata.version}`,
    );
  return (
    versionMismatch && getDestinyManifestSlice(httpClient, { destinyManifest: manifestMetadata, tableNames, language })
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
