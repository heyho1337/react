"use client";

import { useLayoutEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthRoute = (WrappedComponent: any) => {
  	const AuthComponent = (props: any) => {
    	const { data: session, status } = useSession({ required: false });
    	const router = useRouter();
    	const isClient = typeof window !== 'undefined';
		useLayoutEffect(() => {
			//console.log(status);		
      		if (isClient && (status !== 'authenticated' && status !== 'loading')) {
        		router.push('/login');
			}
		
    	}, [isClient, status, router]);

    	return <WrappedComponent {...props} />;
  	};

  	return AuthComponent;
};

export default AuthRoute;