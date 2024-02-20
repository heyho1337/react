"use client";

import ImgComp from '@common/ImgComp';
import Link from 'next/link';

const Header = (params: any) => {
	if (params.session.user) {
		const userData = params.session.user;
		return (
			<header>
				<Link href="/" title="Home page" className="logo" >
					<ImgComp imageUrl="/images/main/head_logo" ext="png" title="Dota2 fantasy app" alt="Dota2 fantasy app" width="164" height="60" />
				</Link>
				<span className="welcome">Welcome {userData?.name}!</span>
				<Link href="/team" title="Manage team" className="openTeam" >Manage team</Link>
				<Link href="/league" title="League" className="openTeam openLeague" >League</Link>
			</header>
		);
	}
	return null;
}

export default Header;