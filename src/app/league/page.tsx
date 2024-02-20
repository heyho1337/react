import Pagination from '@common/Pagination';
import league from '@class/League';
import LeagueCard from '@common/LeagueCard';
import { getServerSession } from "next-auth";
import { authOptions } from '@api/route.js'

export default async function League({ searchParams = {} }: any) {
	
	const page = Number(searchParams['page'] ?? '1');
	const end = Number(page) + 1;
	const data: any[] = await league.getLeagues();
	const session = await getServerSession(authOptions);
	let email: any;

	return <>
		<h1>Leagues</h1>
		<div className="filter">
			<div className="leagueList">
				{
					(() => {
						email = session && session.user ? session.user.email : "false";
					})()
				}
				{data && data.length > 1 ? (
					data[page].map((league: any) => (
						<LeagueCard key={league.docId} email={email} row={league}/>
					))
				) : (
					data && data[0] !== undefined && (
						<>
							{data[0].map((league: any) => (
								<LeagueCard key={league.docId} email={email} row={league}/>
							))}
						</>
					)
				)}
			</div>
			<Pagination
				hasNextPage={end < data.length}
				hasPrevPage={page > 1}
				url="league"
				pageCount={data.length}
			/>
		</div>
	</>;
}