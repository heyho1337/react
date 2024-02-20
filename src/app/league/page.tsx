import Pagination from '@common/Pagination';
import league from '@class/League';

export default async function League({ searchParams = {} }: any) {
	
	const page = Number(searchParams['page'] ?? '1');
	const end = Number(page) + 1;
	const data = await league.getLeagues();

	return <>
		<h1>Leagues</h1>
		<div className="filter">
			<div className="leagueList">
				{data.length > 1 ? data[page].map((league: any) => (
					<span>{league.name}</span>
				))
				: data[0] !== undefined && data[0].map((league: any) => (
					<span>{league.name}</span>
				))}
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