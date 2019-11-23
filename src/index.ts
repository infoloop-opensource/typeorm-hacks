import {Class, RuntimeClassDecorator} from '@infoloop-opensource/abstractions';
import {anonymizeClass} from '@infoloop-opensource/common-utils';
import {Entity, EntityOptions} from 'typeorm';

export const HackedEntity = <T> (options: EntityOptions): RuntimeClassDecorator<T> => {
    return function (clazz: Class<T>) {
        const anonymousClass = anonymizeClass(clazz);
        Entity(options)(anonymousClass);
        return anonymousClass;
    };
};
