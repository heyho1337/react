"use client";

import { useSession } from "next-auth/react";

const UserData = () => {
	const session = useSession();
	if (session?.status === 'authenticated') {
		const userData = session?.data?.user;
		return (
			<>
				<span>Welcome {userData?.name}</span>
			</>
		);
	}
}

export default UserData;