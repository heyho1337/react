// types/DotaPlayerProps.ts

import DotaPlayerStatsProps from "./DotaPlayerStatsProps";

type DotaPlayerProps = DotaPlayerStatsProps & {
	account_id: number
	avatar: string
	avatarmedium: string
	fantasy_role: number
	name: string
	profileurl: string
	team_id: number
	solo_competitive_rank: number
	competitive_rank: number
	leaderboard_rank: number
}

export default DotaPlayerProps;