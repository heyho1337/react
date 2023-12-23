import TeamClient from "./client";
import Players from '@dota/Players';
import Teams from '@dota/Teams';
import TeamProps from '@types/TeamProps';
import Positions from "@dota/Positions";

const Team = ({ children, searchParams = {} }: TeamProps) => {

	const page = Number(searchParams['page'] ?? '1')
	const end = Number(page) + 1;

	return (
		<TeamClient>
			<Teams selectedTeams={searchParams['teams']} />
			<Positions selectedPositions={searchParams['positions']} />
			<Players selectedTeams={searchParams['teams']} selectedPositions={searchParams['positions']} page={page} end={end}
			/>
		</TeamClient>
	)
}



export default Team;

