"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_utils_1 = require("@infoloop-opensource/common-utils");
var typeorm_1 = require("typeorm");
var decorateTimeByClass = new Map();
exports.HackedEntity = function (options) {
    return function (clazz) {
        var count = decorateTimeByClass.get(clazz.name) || 0;
        decorateTimeByClass.set(clazz.name, count + 1);
        var anonymousClass = common_utils_1.anonymizeClass(clazz);
        typeorm_1.Entity(options)(anonymousClass);
        return Object.defineProperty(anonymousClass, 'name', {
            value: clazz.name + "_anonymous" + count
        });
    };
};
