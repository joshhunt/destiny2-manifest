"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function displayName(entry) {
    var _a, _b, _c;
    return _c = (_b = (_a = entry) === null || _a === void 0 ? void 0 : _a.displayProperties) === null || _b === void 0 ? void 0 : _b.name, (_c !== null && _c !== void 0 ? _c : '');
}
exports.displayName = displayName;
function displayDescription(entry) {
    var _a, _b, _c;
    return _c = (_b = (_a = entry) === null || _a === void 0 ? void 0 : _a.displayProperties) === null || _b === void 0 ? void 0 : _b.description, (_c !== null && _c !== void 0 ? _c : '');
}
exports.displayDescription = displayDescription;
function progressDescription(entry) {
    var _a, _b;
    return _b = (_a = entry) === null || _a === void 0 ? void 0 : _a.progressDescription, (_b !== null && _b !== void 0 ? _b : '');
}
exports.progressDescription = progressDescription;
function statName(entry) {
    var _a, _b;
    return _b = (_a = entry) === null || _a === void 0 ? void 0 : _a.statName, (_b !== null && _b !== void 0 ? _b : '');
}
exports.statName = statName;
function tierName(entry) {
    var _a, _b;
    return _b = (_a = entry) === null || _a === void 0 ? void 0 : _a.tierName, (_b !== null && _b !== void 0 ? _b : '');
}
exports.tierName = tierName;
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
exports.escapeRegExp = escapeRegExp;
