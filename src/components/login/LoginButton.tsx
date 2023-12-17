// components/login/LoginButton.tsx

"use client";

import React, { useState } from 'react';
import LoginPopup from './LoginPopup';

const LoginButton = () => {
  	const [isPopupOpen, setPopupOpen] = useState(false);

  	const openPopup = () => {
    	setPopupOpen(true);
 	};

  	const closePopup = () => {
    	setPopupOpen(false);
  	};

  	return (
    	<>
      	<button className="loginButton" onClick={openPopup}>Login</button>
      	{isPopupOpen && <LoginPopup onClose={closePopup} />}
   		</>
  	);
};

export default LoginButton;
