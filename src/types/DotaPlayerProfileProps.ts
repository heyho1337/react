import DotaPlayerStatsProp from '@customTypes/DotaPlayerStatsProp';

type DotaPlayerProfileProps = DotaPlayerStatsProp & {
	matches?: any
	profile?:{
        account_id: number | string
        personaname?: null | string
        name?: string
        plus?: null | boolean
        cheese?: null | number
        steamid?: null | string
        avatar?: null | string
        avatarmedium?: null | string
        avatarfull?: null | string
        profileurl: string
        last_login?: null | string
        loccountrycode?: string | null
        status?: null
        is_contributor?: null | boolean
        is_subscriber?: null | boolean
    }
    rank_tier?: number | null
    competitive_rank?: number | null
    solo_competitive_rank?: number | null
	leaderboard_rank?: number | null
} | undefined

export default DotaPlayerProfileProps;