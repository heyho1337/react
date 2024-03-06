
import league from '@class/League';
import LeagueCardProps from '@customTypes/LeagueCardProps';
import UserDataProps from '@customTypes/UserDataProps';
import UserCard from '@common/UserCard';

export default async function LeaguePage({ params, }: { params: { league_id: string}; }) {

	const leagueData: LeagueCardProps = await league.getLeague(params.league_id);
	const users: UserDataProps[] = await league.leaguePlayers(params.league_id);

	return (
		<>
			{leagueData && <h1>{leagueData.name}</h1>}
			{users && (
				<>
					<div className="userList">
						{users.map((user: UserDataProps) => (
							<UserCard row={user}/>
						))}
					</div>
				</>
			)}
		</>
	);
}