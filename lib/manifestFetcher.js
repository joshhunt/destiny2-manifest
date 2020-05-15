"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var destiny2_1 = require("bungie-api-ts/destiny2");
var manifest_1 = require("bungie-api-ts/destiny2/manifest");
var cross_fetch_1 = require("cross-fetch");
var api_1 = require("destiny2-utils/api");
var utils_1 = require("@sundevour/utils");
exports.httpClient = api_1.generateHttpClient(cross_fetch_1.default);
/**
 * small object with a promise to get API manifest version & paths,
 * and a dispatcher that adds the token in and initiates the request.
 * lives in its own object so we can refer to its results repeatedly,
 * without re-dispatching the request to the api.
 */
exports.manifestMetadataFetcher = {
    promise: utils_1.neverResolve(),
    dispatch: function (token) {
        var _this = this;
        this.promise = (function () { return __awaiter(_this, void 0, void 0, function () {
            var fetchedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manifestMetadataFetch()];
                    case 1:
                        fetchedData = _a.sent();
                        return [2 /*return*/, fetchedData];
                }
            });
        }); })();
        return this.promise;
    },
};
/**
 * in case you're into weird stuff like re-querying the API for updated manifest info
 */
function manifestMetadataFetch() {
    return __awaiter(this, void 0, void 0, function () {
        var manifestMetadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, destiny2_1.getDestinyManifest(exports.httpClient)];
                case 1:
                    manifestMetadata = _a.sent();
                    return [2 /*return*/, manifestMetadata.Response];
            }
        });
    });
}
exports.manifestMetadataFetch = manifestMetadataFetch;
function getTable(language, tableName, ignoreIfVersion, verbose) {
    if (ignoreIfVersion === void 0) { ignoreIfVersion = ''; }
    if (verbose === void 0) { verbose = false; }
    return __awaiter(this, void 0, void 0, function () {
        var manifestMetadata, versionMismatch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.manifestMetadataFetcher.promise];
                case 1:
                    manifestMetadata = _a.sent();
                    versionMismatch = ignoreIfVersion !== manifestMetadata.version;
                    if (verbose)
                        console.log((ignoreIfVersion && versionMismatch ? "bungie.net has a manifest version !== " + ignoreIfVersion + " " : '') + "downloading version " + manifestMetadata.version);
                    return [2 /*return*/, (versionMismatch &&
                            manifest_1.getDestinyManifestComponent(exports.httpClient, { destinyManifest: manifestMetadata, tableName: tableName, language: language }))];
            }
        });
    });
}
exports.getTable = getTable;
function getAllTables(language, ignoreIfVersion, verbose) {
    if (ignoreIfVersion === void 0) { ignoreIfVersion = ''; }
    if (verbose === void 0) { verbose = false; }
    return __awaiter(this, void 0, void 0, function () {
        var manifestMetadata, alreadyUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.manifestMetadataFetcher.promise];
                case 1:
                    manifestMetadata = _a.sent();
                    alreadyUpdated = ignoreIfVersion === manifestMetadata.version;
                    if (verbose) {
                        console.log("bungie.net has manifest version \"" + manifestMetadata.version + "\"");
                        console.log("we have version \"" + ignoreIfVersion + "\"");
                        ignoreIfVersion && alreadyUpdated && console.log("these match and we will skip download");
                        !ignoreIfVersion && console.log("no instructions given to avoid performing a download");
                        ignoreIfVersion && !alreadyUpdated && console.log("time to upgrade");
                        (!ignoreIfVersion || (ignoreIfVersion && !alreadyUpdated)) &&
                            console.log("about to download " + manifestMetadata.version);
                    }
                    return [2 /*return*/, (!alreadyUpdated && manifest_1.getAllDestinyManifestComponents(exports.httpClient, { destinyManifest: manifestMetadata, language: language }))];
            }
        });
    });
}
exports.getAllTables = getAllTables;
function getSomeTables(language, tableNames, ignoreIfVersion, verbose) {
    if (ignoreIfVersion === void 0) { ignoreIfVersion = ''; }
    if (verbose === void 0) { verbose = false; }
    return __awaiter(this, void 0, void 0, function () {
        var manifestMetadata, versionMismatch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.manifestMetadataFetcher.promise];
                case 1:
                    manifestMetadata = _a.sent();
                    versionMismatch = ignoreIfVersion !== manifestMetadata.version || null;
                    if (verbose)
                        console.log((ignoreIfVersion && versionMismatch ? "bungie.net has a manifest version !== " + ignoreIfVersion + " " : '') + "downloading version " + manifestMetadata.version);
                    return [2 /*return*/, (versionMismatch && manifest_1.getDestinyManifestSlice(exports.httpClient, { destinyManifest: manifestMetadata, tableNames: tableNames, language: language }))];
            }
        });
    });
}
exports.getSomeTables = getSomeTables;
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
