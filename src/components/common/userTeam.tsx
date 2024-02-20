import { getServerSession } from "next-auth";
import playerFunctions from '@common/playerFunctions';
import dota from '@dotaClass/DotaJson';
import { authOptions } from '@api/route.js'

async function getUserTeam() {
	const session = await getServerSession(authOptions);
	let team = null;
	let extendedTeam = null;

  	if (session && session.user) {
    	team = await playerFunctions.getTeam(session.user.email);
    
    	if (team && team.length > 0) {
      		extendedTeam = await Promise.all(
        		team.map(async (player) => {
          			const extendedPlayer = { ...player, profile: await dota.getTeamPlayer(player.account_id) };
          			return extendedPlayer;
        		})
			);
   		}
  	}

  	return { team, extendedTeam };
}

export default getUserTeam;