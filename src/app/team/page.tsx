import TeamClient from "./client";
import Players from '@dota/Players';
import Teams from '@dota/Teams';
import TeamProps from '@customTypes/TeamProps';
import Positions from "@dota/Positions";
import userfunctions from '@class/UserFunctions';

export default async function Team ({ children, searchParams = {} }: TeamProps){

	const page = Number(searchParams['page'] ?? '1')
	const end = Number(page) + 1;
	const { team, extendedTeam } = await userfunctions.getUserTeam();

	return (
		<TeamClient>
			<Teams selectedTeams={searchParams['teams']} />
			<Positions selectedPositions={searchParams['positions']} />
			<>
				{team && extendedTeam &&(
					<Players team={team} selectedTeams={searchParams['teams']} selectedPositions={searchParams['positions']} page={page} end={end} />
				)}
			</>
		</TeamClient>
	)
}


