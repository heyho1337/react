import fs from '@db/FireStore';

const dbInstances: { [key: string]: any } = {
    'fs': fs,
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

const newDb = new Database('fs');
const db = newDb.dbType;
export default db;