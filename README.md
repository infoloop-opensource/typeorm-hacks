# typeorm-hacks

This package currently is a minimal implementation to meet special usages of typeorm.
For now there is no neat hack for `Column` decorator at runtime. 

## Examples

1. Store entities in different tables or different dbs while using the same class type for entity declaration

```
import {Connection, createConnection, Repository, EntityOptions, PrimaryColumn} from 'typeorm';
import {decorateClass} from '@infoloop-opensource/common-utils';
import {decorate, HackedEntity} from '@infoloop-opensource/typeorm-hacks';

const config = {
    "host": "localhost",
    "port": 3306,
    "username": "test",
    "password": "",
    "database": "test"
};

class TestClass {
    @PrimaryColumn()
    id: number;
}

const test = async () => {
    const TC1 = decorateClass(TestClass, HackedEntity<TestClass>({
            name: 'test',
            database: 'qa'
        }));
    const TC2 = decorateClass(TestClass, HackedEntity<TestClass>({
        name: 'test',
        database: 'stage'
    }));
    connection = await createConnection({
        ...config,
        type: 'mysql',
        entities: [TC1, TC2],
        logging: false
    });
    const x = new TestClass();
    await connection.getRepository(TC1).insert(x);
    await connection.getRepository(TC2).insert(x);
};

test();
``` 
