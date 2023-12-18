"use client";

import { createContext, useContext, useState } from 'react';

const DotaContext = createContext();

export const DotaProvider = ({ children }) => {
  	const [dotaData, setDotaData] = useState({
    	players: [],
    	status: false,
    	msg: ''
  	});

  	const updateDotaData = (updatedData) => {
    	setDotaData((prevData) => ({ ...prevData, ...updatedData }));
  	};

  	return (
    	<DotaContext.Provider value={{ dotaData, updateDotaData }}>
      		{children}
    	</DotaContext.Provider>
  	);
};

export const useDotaContext = () => {
  	return useContext(DotaContext);
};
