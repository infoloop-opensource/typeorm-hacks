import {Column, createConnection, Repository, EntityOptions, PrimaryColumn} from 'typeorm';
import {decorateClass} from '@infoloop-opensource/common-utils';
import {HackedEntity} from './index';

const config = {
    "host": "localhost",
    "port": 3306,
    "username": "test",
    "password": "",
    "database": "test"
};

class TestClass1 {
    @PrimaryColumn()
    id: number;
}

class TestClass2 {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}

// same table def in different dbs
const test1 = async () => {
    const TC1 = decorateClass(TestClass1, HackedEntity<TestClass1>({
        name: 'test',
        database: 'qa'
    }));
    const TC2 = decorateClass(TestClass1, HackedEntity<TestClass1>({
        name: 'test',
        database: 'stage'
    }));
    const connection = await createConnection({
        ...config,
        type: 'mysql',
        entities: [TC1, TC2],
        logging: false
    });
    const x = new TestClass1();
    await connection.getRepository(TC1).insert(x);
    await connection.getRepository(TC2).insert(x);
    await connection.close();
};

// different table in same db
const test2 = async () => {
    const TC1 = decorateClass(TestClass2, HackedEntity<TestClass2>({
        name: 'test1',
        database: 'qa'
    }));
    const TC2 = decorateClass(TestClass2, HackedEntity<TestClass2>({
        name: 'test2',
        database: 'qa'
    }));
    const connection = await createConnection({
        ...config,
        type: 'mysql',
        entities: [TC1, TC2],
        logging: false
    });
    const x = new TestClass2();
    x.name = 'test';
    await connection.getRepository(TC1).insert(x);
    await connection.getRepository(TC2).insert(x);
    await connection.close();
};

const test = async () => {
    await test1();
    await test2();
};

test();
