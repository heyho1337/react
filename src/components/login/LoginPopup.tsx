// components/login/LoginPopup.tsx
"use client";

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { signIn, useSession } from "next-auth/react";

const LoginPopup = ({ onClose }) => {
	const sign = (provider: string) => {
		const callbackUrl = `${window.location.origin}/loggedin`;
		signIn(provider, { callbackUrl });
		onClose();
	}
  	return (
    	<dialog className="LoginPopup" open>
        	<span>Login with:</span>
			<button type="button" value="google" onClick={() => sign("google")}><FontAwesomeIcon icon={faGoogle} />Google</button>
			<button type="button" value="facebook" onClick={() => sign("facebook")}><FontAwesomeIcon icon={faFacebookF} />Facebook</button>
    	</dialog>
  	);
};

export default LoginPopup;
