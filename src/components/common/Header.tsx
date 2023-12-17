"use client";

import ImgComp from '@common/ImgComp';
import { useSession } from "next-auth/react";
import Link from 'next/link';

const Header = () => {
	const openTeam = () => {

	}
	const session = useSession();
	if (session?.status === 'authenticated') {
		const userData = session?.data?.user;
		return (
			<header>
				<Link href="/" title="Home page" alt="Home page" className="logo" >
					<ImgComp imageUrl="/images/main/head_logo" ext="png" title="Dota2 fantasy app" alt="Dota2 fantasy app" width="164" height="60" />
				</Link>
				<span className="welcome">Welcome {userData?.name}!</span>
				<Link href="/team" title="Manage team" alt="Manage team" className="openTeam" >Manage team</Link>
			</header>
		);
	}
}

export default Header;