import { utils } from '@infoloop-opensource/abstractions';
import { Entity } from 'typeorm';
export const decorate = (clazz, decorator) => {
    return decorator(clazz);
};
const HackedEntityDecorator = (options) => {
    return function (clazz) {
        const anonymousClass = utils.anonymizeClass(clazz);
        Entity(options)(anonymousClass);
        return anonymousClass;
    };
};
