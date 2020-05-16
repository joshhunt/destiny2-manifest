export function displayName(entry) {
    var _a, _b;
    return (_b = (_a = entry === null || entry === void 0 ? void 0 : entry.displayProperties) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
}
export function displayDescription(entry) {
    var _a, _b;
    return (_b = (_a = entry === null || entry === void 0 ? void 0 : entry.displayProperties) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : '';
}
export function progressDescription(entry) {
    var _a;
    return (_a = entry === null || entry === void 0 ? void 0 : entry.progressDescription) !== null && _a !== void 0 ? _a : '';
}
export function statName(entry) {
    var _a;
    return (_a = entry === null || entry === void 0 ? void 0 : entry.statName) !== null && _a !== void 0 ? _a : '';
}
export function tierName(entry) {
    var _a;
    return (_a = entry === null || entry === void 0 ? void 0 : entry.tierName) !== null && _a !== void 0 ? _a : '';
}
export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
