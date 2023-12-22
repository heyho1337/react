import DotaPlayerStatsProps from "./DotaPlayerStatsProps";

type DotaPlayerProfileProps = DotaPlayerStatsProps & {
	rank_tier: number
	solo_competitive_rank: number 
	competitive_rank: number
	leaderboard_rank: number
	matches: any
	profile: {
		personaname: string
		steamid: string
		last_login: Date
		name: string
		account_id: number
		avatarmedium: string
		avatarfull: string
		profileurl: string
	}
}

export default DotaPlayerProfileProps;