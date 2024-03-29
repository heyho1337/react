class Dota {
	public data = {
		players: [],
		chunkedPlayers: [],
		teams: [],
		selectedTeams: [],
	};

	getPlayerChunks(data: any[]) {
		const chunkSize = 14;
		const chunkedPlayers = [];
		for (let i = 0; i < data.length; i += chunkSize) {
			const chunk = data.slice(i, i + chunkSize);
			chunkedPlayers.push(chunk);
		}
	
		this.setData({ chunkedPlayers });
	}

	calcPlayerStats(player: any) {
		player.score = (player.k * 2) + player.a - player.d + player.win - player.lose;
	  
		if (!player.score) {
			player.score = Math.floor(Math.random() * 100) + 1;
		}
		player.total_games = player.win + player.lose;
		player.winrate = ((player.win / player.total_games) * 100).toFixed(2);
	}

	setData(updatedData: any) {
		this.data = { ...this.data, ...updatedData };
	}
}

export default Dota;
