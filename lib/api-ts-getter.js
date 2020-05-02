"use strict";
// this will be rolled into bungie-api-ts i hope
Object.defineProperty(exports, "__esModule", { value: true });
/** fetches the enormous combined JSON manifest file */
function getAllDestinyManifestTables(http, params) {
    return http({
        method: 'GET',
        url: "https://www.bungie.net" + params.destinyManifest.jsonWorldContentPaths[params.language],
    });
}
exports.getAllDestinyManifestTables = getAllDestinyManifestTables;
/** fetches and returns a single table (Component) from the d2 manifest */
function getDestinyManifestTable(http, params) {
    return http({
        method: 'GET',
        url: "https://www.bungie.net" + params.destinyManifest.jsonWorldComponentContentPaths[params.language][params.tableName],
    });
}
exports.getDestinyManifestTable = getDestinyManifestTable;
