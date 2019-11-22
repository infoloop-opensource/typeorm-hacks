"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var abstractions_1 = require("@infoloop-opensource/abstractions");
var typeorm_1 = require("typeorm");
exports.decorate = function (clazz, decorator) {
    return decorator(clazz);
};
var HackedEntityDecorator = function (options) {
    return function (clazz) {
        var anonymousClass = abstractions_1.utils.anonymizeClass(clazz);
        typeorm_1.Entity(options)(anonymousClass);
        return anonymousClass;
    };
};
