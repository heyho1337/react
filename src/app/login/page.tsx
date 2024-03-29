"use client";

import ImgComp from '@common/ImgComp';
import LoginButton from '@login/LoginButton';

const Login = () => {
	return (
		<section className="home">
			<ImgComp imageUrl="/images/main/logo" ext="png" title="easydining" alt="easydining" width="459" height="168" />
			<LoginButton />
		</section>
	)
}

export default Login;
