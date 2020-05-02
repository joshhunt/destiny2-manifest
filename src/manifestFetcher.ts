import { DestinyManifestTableName, getAllDestinyManifestTables, getDestinyManifestTable } from './api-ts-getter';

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
  tableName: DestinyManifestTableName,
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
    versionMismatch && getDestinyManifestTable(httpClient, { destinyManifest: manifestMetadata, tableName, language })
  );
}

export async function getAllTables(language: string, ignoreIfVersion: string = '', verbose = false) {
  const manifestMetadata = await manifestMetadataPromise;
  const versionMismatch = ignoreIfVersion !== manifestMetadata.version;

  if (verbose)
    console.log(
      `${
        ignoreIfVersion && versionMismatch ? `bungie.net has a manifest version !== ${ignoreIfVersion} ` : ''
      }downloading version ${manifestMetadata.version}`,
    );
  return versionMismatch && getAllDestinyManifestTables(httpClient, { destinyManifest: manifestMetadata, language });
}
