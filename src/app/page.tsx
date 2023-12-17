"use client";

import AuthRoute from '@common/AuthRoute';
import UserData from '@common/UserData';

const Home = () => {
	return (
		<>
		  <span>home</span>
		  <UserData />
		</>
	);
}

export default AuthRoute(Home);
