"use server";

import db from '@db/FireStore';
import { getServerSession } from "next-auth";
import { authOptions } from '@api/route.js'

export const addPlayer = async (account_id: string | number) => {
	const session = await getServerSession(authOptions);
	if (session && session.user) {
		const teamPlayerData = {
			user_email: session.user.email,
			account_id: account_id
		}
		db.set('teams', teamPlayerData);
	}
};

export const isPlayerInTeam = async ({ account_id, user }: { account_id: string | number; user: any }) => {
	const teamPlayerData = {
		user_email: user.email,
		account_id: account_id
	}
	const response = await db.isDoc('teams', teamPlayerData);
	if (response === false) {
		return {
			response: response,
			msg: 'player is in the team'
		}
	}
	if (response === true) {
		return {
			response: response,
			msg: 'player is not in the team'
		}
	}
}


export const removePlayer = (account_id: string | number) => {
	console.log("remove: "+ account_id);
};