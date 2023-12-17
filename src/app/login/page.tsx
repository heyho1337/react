"use client";

import ImgComp from '@common/ImgComp';
import LoginButton from '@login/LoginButton';

const Login = () => {
	return (
		<main className="home">
			<ImgComp imageUrl="/images/main/logo" ext="png" title="easydining" alt="easydining" width="459" height="168" />
			<LoginButton />
		</main>
	)
}

export default Login;
