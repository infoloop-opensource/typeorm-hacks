import { anonymizeClass } from '@infoloop-opensource/common-utils';
import { Entity } from 'typeorm';
export const HackedEntity = (options) => {
    return function (clazz) {
        const anonymousClass = anonymizeClass(clazz);
        Entity(options)(anonymousClass);
        return anonymousClass;
    };
};
