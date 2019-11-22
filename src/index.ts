import {Class, RuntimeClassDecorator, utils} from '@infoloop-opensource/abstractions';
import {Entity, EntityOptions} from 'typeorm';

export const decorate = <T> (clazz: Class<T>, decorator: RuntimeClassDecorator<T>): Class<T> => {
    return decorator(clazz);
};

export const HackedEntityDecorator = <T> (options: EntityOptions): RuntimeClassDecorator<T> => {
    return function (clazz: Class<T>) {
        const anonymousClass = utils.anonymizeClass(clazz);
        Entity(options)(anonymousClass);
        return anonymousClass;
    };
};
