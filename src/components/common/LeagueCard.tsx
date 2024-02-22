"use client";

import Link from 'next/link';
import LeagueCardProps from '@customTypes/LeagueCardProps';
import league from '@class/League';

const LeagueCard = ({ row, email, user }: { row: LeagueCardProps, email: string, user: any }) => {
    return (
        <>
			<div key={row.docId}
				className={`leagueCard ${row.full ? 'available' : 'unavailable'} ${user.leagueId.includes(row.docId) ? 'joined' : ''}`}
			>
				<Link href={`/league/${row.docId}`} title={row.name} >
					<span className="name">{row.name}</span>
				</Link>
				{(!row.full && (!user.leagueId.includes(row.docId))) && (
					<button onClick={() => league.joinLeague(row.docId, email)}>Join</button>
				)}
			</div>
        </>
    );
};

export default LeagueCard;