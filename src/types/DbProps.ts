// types/Db.ts

type DbProps = {
	get(table: string, data: any): Promise<any>;
	set(table: string, data: any): Promise<any>;
	del(table: string, data: any): Promise<any>;
	change(table: string, data: any, where: any): Promise<any>;
	getById(table: string, data: any): Promise<any>;
}

export default DbProps;