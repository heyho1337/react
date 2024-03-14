// types/Db.ts

type DbProps = {
	get(): void;
	set(): void;
	del(): void;
	change(): void;
}

export default DbProps;