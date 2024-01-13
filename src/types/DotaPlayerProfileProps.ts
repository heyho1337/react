import DotaPlayerStatsProps from "./DotaPlayerStatsProps";

type DotaPlayerProfileProps = DotaPlayerStatsProps & {
	rank_tier: number
	solo_competitive_rank: number 
	competitive_rank: number
	leaderboard_rank: number
	matches: any
	account_id: number
	profile: {
		personaname: string
		steamid: string
		last_login: Date
		name: string
		account_id: number
		avatarmedium: string
		avatarfull: string
		profileurl: string
		plus: boolean
		cheese: number
		loccountrycode: string
		status: null
		is_contributor: boolean
		is_subscriber: boolean
	}
}

export default DotaPlayerProfileProps;