import { DestinyManifestTableName, getAllDestinyManifestTables, getDestinyManifestTable } from './api-ts-getter';

import { HttpClientConfig } from 'bungie-api-ts/http';
import fetch from 'cross-fetch';
import { getDestinyManifest } from 'bungie-api-ts/destiny2';

/**
 * given set of bungie-api-ts params (HttpClientConfig),
 * contacts the API and interprets results as JSON
 */
export function httpClient(config: HttpClientConfig) {
  return fetch(config.url, config).then((res) => res.json());
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
  try {
    return manifestMetadata.Response;
  } catch (e) {
    console.log(e);
  }
}

export async function getTable(
  language: string,
  tableName: DestinyManifestTableName,
  ignoreIfVersion: string = '',
  verbose = false,
) {
  const manifestMetadata = await manifestMetadataPromise;
  const versionMismatch = ignoreIfVersion !== manifestMetadata.version;

  if (verbose)
    console.log(
      `${
        ignoreIfVersion && versionMismatch ? `bungie.net has a manifest version that isn't ${ignoreIfVersion} ` : ''
      }downloading version ${manifestMetadata.version}`,
    );
  if (versionMismatch)
    return getDestinyManifestTable(httpClient, { destinyManifest: manifestMetadata, tableName, language });
}

export async function getAllTables(language: string, ignoreIfVersion: string = '', verbose = false) {
  const manifestMetadata = await manifestMetadataPromise;
  const versionMismatch = ignoreIfVersion !== manifestMetadata.version;

  if (verbose)
    console.log(
      `${
        ignoreIfVersion && versionMismatch ? `bungie.net has a manifest version that isn't ${ignoreIfVersion} ` : ''
      }downloading version ${manifestMetadata.version}`,
    );
  if (versionMismatch) return getAllDestinyManifestTables(httpClient, { destinyManifest: manifestMetadata, language });
}
