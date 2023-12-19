"use client";

import ImgComp from '@common/ImgComp';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import DotaPlayerProps from '@interfaces/DotaPlayerProps';

const PlayerCard: React.FC<DotaPlayerProps> = ({ player,dota }) => {
	
	// getting additional info from api
	/*
		dota.getPlayerMatches(player.account_id, player);
		
		dota.getPlayerWL(player.account_id, player);
		dota.getPlayerKDA(player.account_id, player);
		dota.calcPlayerStats(player);
	*/
    return (
        <>
			<Link id={player.account_id} className="playerCard" href={player.account_id ? '/player/' + player.account_id : '/team'} title={player.name ?? ''} passHref>
				<div className="imgCont"><img src={player.avatarmedium ?? '/images/main/favicon.png'} alt={player.name ?? ''} width="56" height="56" /></div>
				<span className="name">{player.name ?? 'dota2fantasy'}</span>
				<div className="stats">
					<span className={'winrate ' + (player.winrate >= 60 ? 'high' : 'low')}>WR: {player.winrate} %</span>
					<span className='kda'>KDA: {player.k}/{player.d}/{player.a}</span>
					<span className={'score ' + (player.score >= 50 ? 'high' : 'low')}>{player.score} pts</span>
				</div>
            </Link>
        </>
    );
};

export default PlayerCard;