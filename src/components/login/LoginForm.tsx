import ImgComp from '@common/ImgComp';
import LoginButton from '@login/LoginButton';

const LoginForm = () => {
	return (
	  	<>
			<main className="home">
				<ImgComp imageUrl="/images/main/logo" ext="png" title="easydining" alt="easydining" width="523" height="116" />
				<LoginButton />
			</main>
		</>
	);
};

export default LoginForm;