import type { Metadata } from 'next';
import { NextAuthProvider } from "./Providers";
import { Roboto, Exo_2, Playfair_Display } from 'next/font/google';
import '@styles/style.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { getServerSession } from "next-auth";
import { authOptions } from '@api/route.js'
import ImgComp from '@common/ImgComp';
import LoginButton from '@login/LoginButton';
import { ReactNode } from 'react';
import dota from '@dota/DotaJson';

import Header from '@common/Header';
import { getTeam } from '@common/playerFunctions';
import DotaPlayerProfileProps from '@types/DotaPlayerProfileProps';
import PlayerCard from '@dota/PlayerCard';

export const metadata: Metadata = {
	title: 'Dota fantasy',
  	description: 'Dota fantasy by heyhodesigns',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession(authOptions);
	let team = null;
	let extendedTeam = null;

	if (session && session.user) {
		team = await getTeam(session.user.email);
		if (team && team.length > 0) {
			extendedTeam = await Promise.all(
				team.map(async (player: DotaPlayerProfileProps & { user_email: string }) => {
					const extendedPlayer = { ...player, profile: await dota.getTeamPlayer(player.account_id) };
					return extendedPlayer;
				})
			);			
		}
	}
	return (
		<html lang="en">
			<body>
				<NextAuthProvider>
					{session && session.user ? (
						<>
							<Header session={session} />
							{team && extendedTeam &&(
								<div className="myTeam">
									{extendedTeam.map((player) => (
										<>
											<PlayerCard key={player.account_id} player={player.profile} />
										</>
									))}
								</div>
							)}
							<main>{children}</main>
						</>
					) : (
						<main>
							<section className="home">
								<ImgComp imageUrl="/images/main/logo" ext="png" title="Dota fantasy" alt="Dota fantasy" width="459" height="168" />
								<LoginButton />
							</section>
						</main>
					)}
				</NextAuthProvider>
			</body>
		</html>
	);
}
