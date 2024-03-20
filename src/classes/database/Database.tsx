import fs from '@db/FireStore';
import sym from '@db/Symfony';

const dbInstances: { [key: string]: any } = {
	'fs': fs,
	'sym': sym
};

export class Database {
	public dbType: any;
	constructor(type: string) {
        const dbInstance = dbInstances[type];
        if (dbInstance) {
            this.dbType = dbInstance;
        } else {
            throw new Error('Unsupported database type');
        }
    }
}

const newDb = new Database('sym');
const db = newDb.dbType;
export default db;