import Link from 'next/link';
import UserDataProps from '@customTypes/UserDataProps';

const UserCard = ({row} : {row: UserDataProps}) => {
    return (
        <>
			<div key={row.user_email} className="userCard">
				<Link href={`/user/${row.docId}`} title={row.user_name} >
					<span className="name">{row.user_name}</span>
				</Link>
			</div>
        </>
    );
};

export default UserCard;