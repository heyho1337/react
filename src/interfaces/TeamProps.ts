import { ReactNode } from 'react';

interface TeamProps {
	children: ReactNode;
	searchParams: { [key: string]: string | string[] | undefined };
}

export default TeamProps;