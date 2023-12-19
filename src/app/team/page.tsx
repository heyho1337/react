import TeamClient from "./client";
import Players from '@dota/Players';
import Teams from '@dota/Teams';
import TeamProps from '@interfaces/TeamProps';

const Team = ({ children, searchParams = {} }: TeamProps) => {
	const page = Number(searchParams['page'] ?? '1')
	const end = Number(page) + 1;
	return (
		<TeamClient>
			<Teams/>
			<Players
				page={page}
				end={end}
			/>
		</TeamClient>
	)
}

export default Team;

