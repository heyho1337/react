import dota from '@dota/DotaJson';
import { getServerSession } from "next-auth";
import { authOptions } from '@api/route.js'
import DotaPlayerProfileProps from '@types/DotaPlayerProfileProps';
import Link from 'next/link';
import DotaMatchProps from '@types/DotaMatchProps';
import { SwitchButton } from './playerButtons';
import { isPlayerInTeam } from './playerFunctions';

export default async function PlayerPage({ params, }: { params: { account_id: string | number }; }) {
	
	const player: DotaPlayerProfileProps | undefined = await dota.getPlayerProfile(Number(params.account_id));
	const session = await getServerSession(authOptions);
	let isInTeam, inTeam;
	if (session && session.user) {
		if (player && player.profile) {
			isInTeam = await isPlayerInTeam({ account_id: player.profile.account_id, user: session.user });
			inTeam = isInTeam && isInTeam.response;
		}
	}
	return (
		<>
			{player && player.profile && (
				<>
					<h1>Player: {player.profile.name}</h1>
					<section className="dotaPlayerProfile">
						<Link className="imgCont" href={player.profile.profileurl} title={player.profile.name} passHref>
							<img src={player.profile.avatarfull ?? '/images/main/favicon.png'} alt={player.profile.name} />
						</Link>
						<span className="personaName">{player.profile.personaname}</span>
						<span className="steamId">Steam id: <strong>{player.profile.steamid}</strong></span>
						<span className="last_login">Last login: <strong>{player.profile.last_login}</strong></span>
						<span className="solo_competitive_rank">Solo competitive rank: <strong>{player.solo_competitive_rank}</strong></span>
						<span className="competitive_rank">Competetive rank: <strong>{player.competitive_rank}</strong></span>
						<span className="leaderboard_rank">Leaderboard rank <strong>{player.leaderboard_rank}</strong></span>
						<span className="match_stats">
							<em>W/L: <strong>{player.win + '/' + player.lose}</strong></em>
							<em>Winrate: <strong>{player.winrate} %</strong></em>
							<em>Total games: <strong>{player.total_games}</strong></em>
						</span>
						<span className="scores">
							<em>K/D/A: <strong>{player.k + '/' + player.d + '/' + player.a}</strong></em>
							<em>Fantasy score: <strong>{player.score} pts</strong></em>
						</span>
						<div className="matches">
							<div className="match_header">
								<span>ID</span>
								<span>Hero name</span>
								<span>Duration</span>
								<span>Winnder</span>
								<span>K/D/A</span>
							</div>
							{player.matches && player.matches.length > 0 && (
								<>
									{player.matches.map((match: DotaMatchProps) => (
										<div className="match" key={match.match_id}>
											<span className="match_id">{match.match_id}</span>
											<span className="hero_name">{match.hero_name}</span>
											<span className="duration">{new Date(match.duration * 1000).toISOString().substr(11, 8)}</span>
											<span className="winner">{match.radiant_win ? 'Radiant' : 'Dire'}</span>
											<span className="kda">{match.kills + '/' + match.deaths + '/' + match.assists}</span>
										</div>
									))}
								</>
							)}
						</div>
						<>
							{isInTeam && isInTeam.msg && (
								<>
									<SwitchButton inTeam={inTeam} account_id={player.profile.account_id} />
								</>
							)}
						</>
					</section>
				</>
			)}
		</>
	);
}