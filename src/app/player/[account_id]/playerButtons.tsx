"use client";
import React, { useState } from 'react';
import playerFunctions from '@class/playerFunctions';

export const AddButton: React.FC<{ account_id: string | number; switchBtn: () => void }> = ({ account_id, switchBtn }) => {

	return (
		<button className="playerFunctionBtn addPlayer" onClick={() => { playerFunctions.addPlayer(account_id); switchBtn(); }}>
			Add to team
		</button>
	);
};

export const RemoveButton: React.FC<{ account_id: string | number; switchBtn: () => void }> = ({ account_id, switchBtn }) => {

	return (
		<button className="playerFunctionBtn removePlayer" onClick={() => { playerFunctions.removePlayer(account_id); switchBtn(); }}>
			Remove from team
		</button>
	);
};

export const SwitchButton: React.FC<{ account_id: string | number; inTeam: any; }> = ({ account_id, inTeam }) => {
	
	const [isAdding, setIsAdding] = useState(true);
	
	const switchBtn = () => {
		setIsAdding((prevIsAdding) => !prevIsAdding);
	}
	
	return (
		<>
			{inTeam ? (
				<>
					{isAdding ? (
						<AddButton account_id={account_id} switchBtn={switchBtn}/>
					) : (
						<RemoveButton account_id={account_id} switchBtn={switchBtn}/>
					)}	
				</>
			) : (
				<>
					{isAdding ? (
						<RemoveButton account_id={account_id} switchBtn={switchBtn}/>
					) : (
						<AddButton account_id={account_id} switchBtn={switchBtn}/>
					)}	
				</>
			)}
		</>
	);
}

