// types/Db.ts

type DbProps = {
	get(table: string, data: any): Promise<true | null>;
	set(table: string, data: any): Promise<true | null>;
	del(table: string, data: any): Promise<true | null>;
	change(table: string, data: any, where: any): Promise<boolean>;
	getById(table: string, id: string): Promise<true | null>;
}

export default DbProps;