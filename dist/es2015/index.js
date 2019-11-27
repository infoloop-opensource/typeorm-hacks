import { anonymizeClass } from '@infoloop-opensource/common-utils';
import { Entity } from 'typeorm';
const decorateTimeByClass = new Map();
export const HackedEntity = (options) => {
    return function (clazz) {
        const count = decorateTimeByClass.get(clazz.name) || 0;
        decorateTimeByClass.set(clazz.name, count + 1);
        const anonymousClass = anonymizeClass(clazz);
        Entity(options)(anonymousClass);
        return Object.defineProperty(anonymousClass, 'name', {
            value: `${clazz.name}_anonymous${count}`
        });
    };
};
