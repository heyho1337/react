type DotaMatchProps =  {
	match_id: number
	player_slot: number
	radiant_win: true | false
	duration: number
	game_mode: number
	lobby_type: number
	hero_id: number
	version: number
	kills: number
	deaths: number
	assists: number
	skill: number
	average_rank: number
	leaver_status: number 
	party_size: number
	hero_name: string
} | undefined

export default DotaMatchProps;