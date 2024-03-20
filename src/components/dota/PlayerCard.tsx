import Link from 'next/link';
import DotaPlayerProps from '@customTypes/DotaPlayerProps';

const PlayerCard = ({ player }: { player: DotaPlayerProps }) => {
	return (
        <>
			<div key={player.account_id} className={'playerCard ' + (player.available ? 'available' : 'unavailable')}>
				<Link id={player.account_id.toString()} href={`/player/${player.account_id}`} title={player.name} >
					<div className="imgCont"><img src={player.avatarmedium ?? '/images/main/favicon.png'} alt={player.name} width="56" height="56" /></div>
					<span className="name">{player.name}</span>
					<div className="stats">
						{player.winrate !== NaN && player.winrate !== undefined && (
							<span className={'winrate ' + (player.winrate >= 60 ? 'high' : 'low')}>WR: {player.winrate} %</span>
						)}
						{player.k && (
							<span className='kda'>KDA: {player.k}/{player.d}/{player.a}</span>
						)}
						{player.score && (
							<span className={'score ' + (player.score >= 50 ? 'high' : 'low')}>{player.score} pts</span>
						)}
					</div>
				</Link>
			</div>
        </>
    );
};

export default PlayerCard;