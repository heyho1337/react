"use client";

import Link from 'next/link';
import LeagueCardProps from '@customTypes/LeagueCardProps';
import league from '@class/League';

const LeagueCard = ({ row, email }: {row: LeagueCardProps, email: string}) => {
    return (
        <>
			<div key={row.docId} className={'leagueCard ' + (row.full ? 'available' : 'unavailable')}>
				<Link href={`/league/${row.docId}`} title={row.name} >
					<span className="name">{row.name}</span>
				</Link>
				{(!row.full && (
					<button onClick={() => league.joinLeague(row.docId, email)}>Join</button>
				))}
			</div>
        </>
    );
};

export default LeagueCard;