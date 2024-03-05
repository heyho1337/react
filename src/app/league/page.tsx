import Pagination from '@common/Pagination';
import league from '@class/League';
import LeagueCard from '@common/LeagueCard';
import { getServerSession } from "next-auth";
import { authOptions } from '@api/route.js'
import userFunc from '@class/userFunctions';
import UserDataProps from '@customTypes/UserDataProps';
import Link from 'next/link';

export default async function League({ searchParams = {} }: any) {
	
	const page = Number(searchParams['page'] ?? '1');
	const end = Number(page) + 1;
	const data: any[] = await league.getLeagues();
	const session = await getServerSession(authOptions);
	let email: any;
	let user: UserDataProps;
	if (session && session.user) {
		email = session.user.email;
		user = await userFunc.getUserData(email);
	}
	return <>
		<h1>Leagues</h1>
		<div className="filter">
			<Link href="/new-league" title="New league" className="newLeague">New league</Link>
			{user && (
				<>
					<div className="leagueList">
						{data && data.length > 1 ? (
							data[page].map((league: any) => (
								<LeagueCard user={user} key={league.docId} email={email} row={league} />
							))
						) : (
							data && data[0] !== undefined && (
								<>
									{data[0].map((league: any) => (
										<LeagueCard user={user} key={league.docId} email={email} row={league} />
									))}
								</>
							)
						)}
					</div>
				</>
			)}
			<Pagination
				hasNextPage={end < data.length}
				hasPrevPage={page > 1}
				url="league"
				pageCount={data.length}
			/>
		</div>
	</>;
}