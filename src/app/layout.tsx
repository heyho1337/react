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
import Header from '@common/Header';
import PlayerCard from '@dota/PlayerCard';
import userFunctions from '@class/userFunctions';

export const metadata: Metadata = {
	title: 'Dota fantasy',
  	description: 'Dota fantasy by heyhodesigns',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession(authOptions);
	const { team, extendedTeam } = await userFunctions.getUserTeam();
	const user: any = await userFunctions.getUserData();
	let userLeague: any;
	if (user) {
		userLeague = await userFunctions.getUserLeague(user[0].leagueId);
	}
	return (
		<html lang="en">
			<body>
				<NextAuthProvider>
					{session && session.user && user && userLeague ? (
						<>
							<Header userLeague={userLeague} user={user} session={session} />
							{team && extendedTeam &&(
								<div key={"myTeam"} className="myTeam">
									{extendedTeam.map((player: any) => (
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
