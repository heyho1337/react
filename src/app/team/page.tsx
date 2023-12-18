"use client";

import AuthRoute from '@common/AuthRoute';
import React from 'react';
import Players from '@dota/Players'; // Make sure the path is correct

const Team = ({searchParams,}: {searchParams: { [key: string]: string | string[] | undefined }}) => {
	const page = Number(searchParams['page'] ?? '1')
	const end = Number(page) + 1;

  	return (
    	<>
			<h1>Manage your team</h1>
      		<form className="filter">
			  	<Players
					page={page}
					end={end}
				/>	
			</form>
    	</>
  	);
};

export default AuthRoute(Team);
