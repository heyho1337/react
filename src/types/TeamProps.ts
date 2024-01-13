// types/TeamProps.ts

import { ReactNode } from 'react';

type TeamProps = {
	children: ReactNode;
	team: any;
	searchParams: { [key: string]: string | string[] | undefined };
}

export default TeamProps;