import db from '@db/FireStore';
import Dota from '@dotaClass/Dota';

class League extends Dota{
	
	list = () => {
		const leagueData = {
			active: 1,
		}
		return db.get('leagues', leagueData);
	};

	getLeagues = async () => {
		const list = await this.list();
		this.getPlayerChunks(list);
		return this.data.chunkedPlayers;
	}

}

const league = new League();
export default league;