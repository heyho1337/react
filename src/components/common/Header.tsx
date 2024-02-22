"use client";

import ImgComp from '@common/ImgComp';
import Link from 'next/link';
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = (params: any) => {
	return (
		<header>
			<Link href="/" title="Home page" className="logo" >
				<ImgComp imageUrl="/images/main/head_logo" ext="png" title="Dota2 fantasy app" alt="Dota2 fantasy app" width="164" height="60" />
			</Link>
			<span></span>
			<Link href="/players" title="Players" className="openTeam" >Players</Link>
			<Link href="/league" title="Leagues" className="openTeam openLeague" >Leagues</Link>
			<span className="welcome">
				Welcome {params.user.user_name}!
			</span>
			<Dropdown>
				<DropdownTrigger>
					<button className="menuOpen">
						<FontAwesomeIcon icon={faBars} />
						<FontAwesomeIcon icon={faXmark}/>
					</button>
				</DropdownTrigger>
				<DropdownMenu className="menuDrop" aria-label="User menu">
					<DropdownItem href="/team" title="Team" key="team">Team</DropdownItem>
					<DropdownItem href="/user-leagues" title="Leagues" key="user-leagues">Leagues</DropdownItem>
					<DropdownItem href="/profile" title="Profile" key="profile">Profile</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</header>
	);
}

export default Header;