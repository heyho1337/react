"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import db from '@db/FireStore';
import { useEffect, useRef } from 'react';

export default function Loggedin() {
	const session = useSession();
	const router = useRouter();
	const hasRun = useRef(false);
	useEffect(() => {
		// The code inside this block will run once when the component mounts
		if (!hasRun.current && session?.status === 'authenticated') {
		  	const userData = {
				user_name: session?.data?.user?.name,
				user_email: session?.data?.user?.email
		 	}
	
		  	console.log(session.data);
	
			db.set('users', userData);
			router.push('/');
			hasRun.current = true;
		}
	}, [session]); // The dependency array ensures that the effect runs only when 'session' changes
}