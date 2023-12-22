"use client";

import React from 'react';
import {addPlayer, removePlayer} from './playerFunctions';

export const AddButton: React.FC<{ account_id: string }> = ({ account_id }) => {

	return (
		<button className="addPlayer" onClick={() => addPlayer(account_id)}>
			Add to team
		</button>
	);
};

export const removeButton: React.FC<{ account_id: string }> = ({ account_id }) => {

	return (
		<button className="removePlayer" onClick={() => removePlayer(account_id)}>
			Add to team
		</button>
	);
};

