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
var api_ts_getter_1 = require("./api-ts-getter");
var cross_fetch_1 = require("cross-fetch");
var destiny2_1 = require("bungie-api-ts/destiny2");
/**
 * given set of bungie-api-ts params (HttpClientConfig),
 * contacts the API and interprets results as JSON
 */
function httpClient(config) {
    return cross_fetch_1.default(config.url, config).then(function (res) { return res.json(); });
}
exports.httpClient = httpClient;
/**
 * performs a 1-time fetch on script load, whose results we can
 * repeatedly refer back to if we need, by awaiting it
 */
exports.manifestMetadataPromise = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var manifestMetadata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, manifestMetadataFetch()];
            case 1:
                manifestMetadata = _a.sent();
                if (!manifestMetadata)
                    process.exit(1);
                return [2 /*return*/, manifestMetadata];
        }
    });
}); })();
/**
 * in case you're into weird stuff like re-querying the API for updated manifest info
 */
function manifestMetadataFetch() {
    return __awaiter(this, void 0, void 0, function () {
        var manifestMetadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, destiny2_1.getDestinyManifest(httpClient)];
                case 1:
                    manifestMetadata = _a.sent();
                    try {
                        return [2 /*return*/, manifestMetadata.Response];
                    }
                    catch (e) {
                        console.log(e);
                    }
                    return [2 /*return*/];
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
                case 0: return [4 /*yield*/, exports.manifestMetadataPromise];
                case 1:
                    manifestMetadata = _a.sent();
                    versionMismatch = ignoreIfVersion !== manifestMetadata.version;
                    if (verbose)
                        console.log((ignoreIfVersion && versionMismatch ? "bungie.net has a manifest version that isn't " + ignoreIfVersion + " " : '') + "downloading version " + manifestMetadata.version);
                    if (versionMismatch)
                        return [2 /*return*/, api_ts_getter_1.getDestinyManifestTable(httpClient, { destinyManifest: manifestMetadata, tableName: tableName, language: language })];
                    return [2 /*return*/];
            }
        });
    });
}
exports.getTable = getTable;
function getAllTables(language, ignoreIfVersion, verbose) {
    if (ignoreIfVersion === void 0) { ignoreIfVersion = ''; }
    if (verbose === void 0) { verbose = false; }
    return __awaiter(this, void 0, void 0, function () {
        var manifestMetadata, versionMismatch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.manifestMetadataPromise];
                case 1:
                    manifestMetadata = _a.sent();
                    versionMismatch = ignoreIfVersion !== manifestMetadata.version;
                    if (verbose)
                        console.log((ignoreIfVersion && versionMismatch ? "bungie.net has a manifest version that isn't " + ignoreIfVersion + " " : '') + "downloading version " + manifestMetadata.version);
                    if (versionMismatch)
                        return [2 /*return*/, api_ts_getter_1.getAllDestinyManifestTables(httpClient, { destinyManifest: manifestMetadata, language: language })];
                    return [2 /*return*/];
            }
        });
    });
}
exports.getAllTables = getAllTables;
