import TeamClient from "./client";
import Players from '@dota/Players';
import Teams from '@dota/Teams';
import TeamProps from '@types/TeamProps';
import Positions from "@dota/Positions";
import getUserTeam from '@common/userTeam';

export default async function Team ({ children, searchParams = {} }: TeamProps){

	const page = Number(searchParams['page'] ?? '1')
	const end = Number(page) + 1;
	const { team, extendedTeam } = await getUserTeam();

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


