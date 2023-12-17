
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthRoute = (WrappedComponent) => {
  	const AuthComponent = (props) => {
    	const { data: session, status } = useSession({ required: false });
    	const router = useRouter();
    	const isClient = typeof window !== 'undefined';
		useEffect(() => {
			console.log(status);		
      		if (isClient && (status !== 'authenticated' && status !== 'loading')) {
        		router.push('/login');
			}
		
    	}, [isClient, status, router]);

    	return <WrappedComponent {...props} />;
  	};

  	return AuthComponent;
};

export default AuthRoute;
