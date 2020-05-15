"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var idb_keyval_1 = require("idb-keyval");
var __1 = require("..");
var manifest_1 = require("destiny2-utils/manifest");
var manifestStore = new idb_keyval_1.Store('manifestDb', 'manifestStore');
/**
 * D2Manifest but saves manifest obects to indexeddb
 */
var D2ManifestNode = /** @class */ (function (_super) {
    __extends(D2ManifestNode, _super);
    function D2ManifestNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // check files in the manifestsPath, find the highest numbered one
    D2ManifestNode.prototype.latest = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var manifestsByVersion;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, idb_keyval_1.keys(manifestStore)];
                    case 1:
                        manifestsByVersion = (_c.sent()).sort(manifest_1.compareVersionNumbers);
                        // trim 83341.20.04.17.1921-8.json to 83341.20.04.17.1921-8
                        return [2 /*return*/, (_b = (_a = manifestsByVersion[0]) === null || _a === void 0 ? void 0 : _a.replace('.json', '')) !== null && _b !== void 0 ? _b : ''];
                }
            });
        });
    };
    /**
     * loads an ALREADY saved manifest file
     * update()s one from the internet if none is found,
     * unless suppressUpdate is set
     */
    D2ManifestNode.prototype.load = function (suppressUpdate) {
        if (suppressUpdate === void 0) { suppressUpdate = false; }
        return __awaiter(this, void 0, void 0, function () {
            var latestManifest, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.latest()];
                    case 1:
                        latestManifest = _b.sent();
                        if (!latestManifest) return [3 /*break*/, 6];
                        this.verbose && console.log("loading latest saved manifest: " + latestManifest);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, idb_keyval_1.get(latestManifest, manifestStore)];
                    case 3:
                        _a.manifest = _b.sent();
                        this.verbose && console.log('manifest loaded');
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.log(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        this.verbose && console.log('no latest manifest found.');
                        if (suppressUpdate)
                            return [2 /*return*/];
                        this.verbose && console.log('downloading new manifest.');
                        return [4 /*yield*/, this.update()];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * saves the loaded manifest to a json file
     */
    D2ManifestNode.prototype.save = function (version) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, idb_keyval_1.set(version, this.manifest, manifestStore)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return D2ManifestNode;
}(__1.default));
exports.default = D2ManifestNode;
