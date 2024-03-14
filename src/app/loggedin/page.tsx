"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import db from '@db/Database';
import { useLayoutEffect, useRef } from 'react';

export default function Loggedin() {
	const session = useSession();
	const router = useRouter();
	const hasRun = useRef(false);
	useLayoutEffect(() => {
		// The code inside this block will run once when the component mounts
		if (!hasRun.current && session?.status === 'authenticated') {
		  	const userData = {
				user_name: session?.data?.user?.name,
				user_email: session?.data?.user?.email
		 	}
	
			db.set('users', userData);
			router.push('/');
			hasRun.current = true;
		}
	}, [session]); // The dependency array ensures that the effect runs only when 'session' changes
}