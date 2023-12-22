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

export const metadata: Metadata = {
	title: 'Dota fantasy',
  	description: 'Dota fantasy by heyhodesigns',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en">
			<body>
				<NextAuthProvider>
					{session && session.user ? (
						<>
							<Header session={session} />
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
