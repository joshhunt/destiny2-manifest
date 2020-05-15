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
var fs = require("fs");
var __1 = require("..");
var manifest_1 = require("destiny2-utils/manifest");
var path_1 = require("path");
/**
 * D2Manifest but saves manifest jsons to a specified path
 */
var D2ManifestNode = /** @class */ (function (_super) {
    __extends(D2ManifestNode, _super);
    /**
     * @param apiToken api token for bungie.net
     * @param language en (default) / fr / es / es-mx / de / it / ja / pt-br / ru / pl / ko / zh-cht / zh-chs
     * @param verbose console log steps during async methods
     * @param manifestsPath where to store/load manifests (default "./manifest")
     */
    function D2ManifestNode(apiToken, language, verbose, manifestsPath) {
        if (language === void 0) { language = 'en'; }
        if (verbose === void 0) { verbose = false; }
        if (manifestsPath === void 0) { manifestsPath = "." + path_1.sep + "manifest"; }
        var _this = _super.call(this, apiToken, language, verbose) || this;
        _this.manifestsPath = "" + manifestsPath.replace(/[\\\/]$/, '') + path_1.sep;
        return _this;
    }
    // check files in the manifestsPath, find the highest numbered one
    D2ManifestNode.prototype.latest = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var manifestsByVersion;
            return __generator(this, function (_c) {
                manifestsByVersion = fs.readdirSync(this.manifestsPath).sort(manifest_1.compareVersionNumbers);
                // trim 83341.20.04.17.1921-8.json to 83341.20.04.17.1921-8
                return [2 /*return*/, (_b = (_a = manifestsByVersion[0]) === null || _a === void 0 ? void 0 : _a.replace('.json', '')) !== null && _b !== void 0 ? _b : ''];
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
            var latestManifest, manifestLoadedOk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fs.existsSync(this.manifestsPath))
                            fs.mkdirSync(this.manifestsPath);
                        return [4 /*yield*/, this.latest()];
                    case 1:
                        latestManifest = _a.sent();
                        this.verbose && !latestManifest && console.log('no latest manifest found');
                        manifestLoadedOk = false;
                        if (!latestManifest) return [3 /*break*/, 3];
                        this.verbose && console.log("loading latest saved manifest: " + latestManifest + ".json");
                        try {
                            this.manifest = JSON.parse(fs.readFileSync(this.manifestsPath + latestManifest + '.json', 'utf8'));
                            this.verbose && console.log('manifest loaded');
                            manifestLoadedOk = true;
                        }
                        catch (e) {
                            this.verbose && console.log('manifest failed loading. file missing? malformed?');
                            console.log(e);
                        }
                        if (!!manifestLoadedOk) return [3 /*break*/, 3];
                        if (suppressUpdate) {
                            this.verbose && console.log('updating suppressed by suppressUpdate');
                            return [2 /*return*/];
                        }
                        this.verbose && console.log('downloading new manifest');
                        return [4 /*yield*/, this.update(!!latestManifest)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
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
                fs.writeFileSync(this.manifestsPath + version + '.json', JSON.stringify(this.manifest));
                return [2 /*return*/, true];
            });
        });
    };
    return D2ManifestNode;
}(__1.default));
exports.default = D2ManifestNode;
