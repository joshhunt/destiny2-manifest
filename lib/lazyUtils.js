"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function displayName(entry) {
    var _a, _b;
    return (_b = (_a = entry === null || entry === void 0 ? void 0 : entry.displayProperties) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
}
exports.displayName = displayName;
function displayDescription(entry) {
    var _a, _b;
    return (_b = (_a = entry === null || entry === void 0 ? void 0 : entry.displayProperties) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : '';
}
exports.displayDescription = displayDescription;
function progressDescription(entry) {
    var _a;
    return (_a = entry === null || entry === void 0 ? void 0 : entry.progressDescription) !== null && _a !== void 0 ? _a : '';
}
exports.progressDescription = progressDescription;
function statName(entry) {
    var _a;
    return (_a = entry === null || entry === void 0 ? void 0 : entry.statName) !== null && _a !== void 0 ? _a : '';
}
exports.statName = statName;
function tierName(entry) {
    var _a;
    return (_a = entry === null || entry === void 0 ? void 0 : entry.tierName) !== null && _a !== void 0 ? _a : '';
}
exports.tierName = tierName;
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
exports.escapeRegExp = escapeRegExp;
