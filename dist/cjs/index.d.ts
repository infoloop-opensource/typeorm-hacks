import { RuntimeClassDecorator } from '@infoloop-opensource/abstractions';
import { EntityOptions } from 'typeorm';
export declare const decorate: <T>(clazz: import("@infoloop-opensource/abstractions").Constructor<T>, decorator: RuntimeClassDecorator<T>) => import("@infoloop-opensource/abstractions").Constructor<T>;
export declare const HackedEntityDecorator: <T>(options: EntityOptions) => RuntimeClassDecorator<T>;
