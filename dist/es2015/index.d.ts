import { RuntimeClassDecorator } from '@infoloop-opensource/abstractions';
import { EntityOptions } from 'typeorm';
export declare const HackedEntity: <T>(options: EntityOptions) => RuntimeClassDecorator<T>;
