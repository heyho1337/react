// components/login/LoginPopup.tsx
"use client";

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { signIn, useSession } from "next-auth/react";

const LoginPopup = ({ onClose }: any) => {
	const sign = (provider: string) => {
		const callbackUrl = `${window.location.origin}/loggedin`;
		signIn(provider, { callbackUrl });
		onClose();
	}
  	return (
    	<dialog className="LoginPopup" open>
        	<span>Login with:</span>
			<button type="button" value="google" onClick={() => sign("google")}><FontAwesomeIcon icon={faGoogle} /><span>Google</span></button>
			<button type="button" value="facebook" onClick={() => sign("facebook")}><FontAwesomeIcon icon={faFacebookF} /><span>Facebook</span></button>
    	</dialog>
  	);
};

export default LoginPopup;
