import {Class, RuntimeClassDecorator} from '@infoloop-opensource/abstractions';
import {anonymizeClass} from '@infoloop-opensource/common-utils';
import {Entity, EntityOptions} from 'typeorm';

const decorateTimeByClass = new Map<string, number>();

export const HackedEntity = <T> (options: EntityOptions): RuntimeClassDecorator<T> => {
    return function (clazz: Class<T>) {
        const count = decorateTimeByClass.get(clazz.name) || 0;
        decorateTimeByClass.set(clazz.name, count + 1);
        const anonymousClass = anonymizeClass(clazz);
        Entity(options)(anonymousClass);
        return Object.defineProperty(anonymousClass, 'name', {
            value: `${clazz.name}_anonymous${count}`
        });
    };
};
