"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_utils_1 = require("@infoloop-opensource/common-utils");
var typeorm_1 = require("typeorm");
exports.HackedEntity = function (options) {
    return function (clazz) {
        var anonymousClass = common_utils_1.anonymizeClass(clazz);
        typeorm_1.Entity(options)(anonymousClass);
        return anonymousClass;
    };
};
