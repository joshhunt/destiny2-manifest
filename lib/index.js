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
var lazyUtils_1 = require("./lazyUtils");
var manifestFetcher_1 = require("./manifestFetcher");
var preferredCategories = [1, 20, 18, 19, 16, 34, 35, 39, 42, 43, 44, 53, 1784235469, 2088636411];
/**
 * FEED ME A STRAY API TOKEN
 */
var D2Manifest = /** @class */ (function () {
    /**
     * @param apiToken api token for bungie.net
     * @param language en (default) / fr / es / es-mx / de / it / ja / pt-br / ru / pl / ko / zh-cht / zh-chs
     * @param verbose console log steps during async methods
     */
    function D2Manifest(apiToken, language, verbose) {
        if (language === void 0) { language = 'en'; }
        if (verbose === void 0) { verbose = false; }
        this.apiToken = apiToken;
        this.language = language;
        this.verbose = verbose;
        manifestFetcher_1.manifestMetadataFetcher.dispatch(this.apiToken);
    }
    /** stubbed here. no persistent manifest so this just pulls a new one from d2 API */
    D2Manifest.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.update()];
            });
        });
    };
    /** stubbed here. no persistent manifest. */
    D2Manifest.prototype.save = function (version) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    D2Manifest.prototype.latest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ''];
            });
        });
    };
    /**
     * checks bungie.net for the current manifest version
     * downloads a copy if there's a newer version than saved
     * loads up the newest manifest afterward
     */
    D2Manifest.prototype.update = function (force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var manifestMetadata, latestManifest, _a, manifest, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, manifestFetcher_1.manifestMetadataFetcher.promise];
                    case 1:
                        manifestMetadata = _b.sent();
                        if (!force) return [3 /*break*/, 2];
                        _a = '!FORCE UPDATE!';
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.latest()];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        latestManifest = _a;
                        this.verbose && console.log("latest saved version: " + latestManifest);
                        return [4 /*yield*/, manifestFetcher_1.getAllTables(this.language, latestManifest, true)];
                    case 5:
                        manifest = _b.sent();
                        if (!manifest) {
                            console.log("didn't get the manifest\n" + (manifest === false ? "version matched " + latestManifest : ''));
                            return [2 /*return*/];
                        }
                        this.verbose && console.log('manifest downloaded. loading update.');
                        this.manifest = manifest;
                        this.save(manifestMetadata.version);
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * searches an entire manifest table, doing case-insenstive string matching.
     * checks against name, description, progressDescription, statName, tierName.
     * prefers matching search term to the entire word.
     * prefers major item categories, trying to avoid weird same-named stuff like catalysts.
     */
    D2Manifest.prototype.find = function (tableName, needle, tableFilter) {
        var searchResults = [];
        var needles;
        try {
            needles = [new RegExp("\\b" + needle + "\\b", 'i'), new RegExp(needle, 'i'), new RegExp(lazyUtils_1.escapeRegExp(needle), 'i')];
        }
        catch (_a) {
            this.verbose && console.log('that regex did not go well. trying simpler.');
            needles = [new RegExp("\\b" + lazyUtils_1.escapeRegExp(needle) + "\\b", 'i'), new RegExp(lazyUtils_1.escapeRegExp(needle), 'i')];
        }
        searching: {
            var searchFields = [lazyUtils_1.displayName, lazyUtils_1.displayDescription, lazyUtils_1.progressDescription, lazyUtils_1.statName, lazyUtils_1.tierName];
            var _loop_1 = function (needleRegex) {
                var _loop_2 = function (searchField) {
                    searchResults = this_1.getAll(tableName)
                        .filter(tableFilter ? tableFilter : function () { return true; })
                        .filter(function (item) { return needleRegex.test(searchField(item)); });
                    if (searchResults.length)
                        return "break-searching";
                };
                for (var _i = 0, searchFields_1 = searchFields; _i < searchFields_1.length; _i++) {
                    var searchField = searchFields_1[_i];
                    var state_2 = _loop_2(searchField);
                    switch (state_2) {
                        case "break-searching": return state_2;
                    }
                }
            };
            var this_1 = this;
            for (var _i = 0, needles_1 = needles; _i < needles_1.length; _i++) {
                var needleRegex = needles_1[_i];
                var state_1 = _loop_1(needleRegex);
                switch (state_1) {
                    case "break-searching": break searching;
                }
            }
        }
        var filteredSearchResults = searchResults.filter(function (item) { var _a; return !isItem(item) || ((_a = item.itemCategoryHashes) === null || _a === void 0 ? void 0 : _a.some(function (hash) { return preferredCategories.includes(hash); })); });
        var finalSearchResults = filteredSearchResults.length ? filteredSearchResults : searchResults;
        return finalSearchResults;
    };
    /** performs a lookup of a known hash */
    D2Manifest.prototype.get = function (tableName, hash) {
        var _a;
        return (_a = this.manifest) === null || _a === void 0 ? void 0 : _a[tableName][hash !== null && hash !== void 0 ? hash : -99999999];
    };
    /** returns an array of table contents */
    D2Manifest.prototype.getAll = function (tableName, tableFilter) {
        var _a, _b;
        return Object.values((_b = (_a = this.manifest) === null || _a === void 0 ? void 0 : _a[tableName]) !== null && _b !== void 0 ? _b : {}).filter(tableFilter ? tableFilter : function () { return true; });
    };
    return D2Manifest;
}());
exports.default = D2Manifest;
/** look a typeguard */
function isItem(entry) {
    return entry.itemCategoryHashes !== undefined;
}
