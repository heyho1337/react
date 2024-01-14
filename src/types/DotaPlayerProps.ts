import DotaPlayerStatsProp from '@customTypes/DotaPlayerStatsProp';

type DotaPlayerProps = DotaPlayerStatsProp & {
	account_id: string | number
	avatar?: null | string
	avatarmedium?: null | string
	fantasy_role?: null | number
	name: string
	profileurl?: null | string
	team_id?: null | number
	solo_competitive_rank?: null | number
	competitive_rank?: null | number
	leaderboard_rank?: null | number
	available?: null | number
	steamid?: null | number | string
	avatarfull?: null | string
	personaname?: null | string
	last_login?: null | string
	full_history_time?: null | string
	cheese?: null | number
	fh_unavailable?: null | boolean
	loccountrycode?: null | string
	last_match_time?: null | string
	plus?: null | boolean
	country_code?: string
	team_name?: null | string
	team_tag?: null | string
	is_locked?: null | boolean
	is_pro?: null | boolean
	locked_until?: null | string
}

export default DotaPlayerProps;