"use client";
import Forms from '@class/Forms';
import FormElementsProp from '@customTypes/FormElementsProp';
import db from '@db/FireStore';

export default function NewLeague() {
	const initialElements: FormElementsProp[] = [
		{
		  	name: 'leagueName',
		  	label: 'League Name',
		  	type: 'text',
		  	id: 'leagueName',
		  	required: true,
		},
		{
		  	name: 'newLeagueSubmit',
		  	label: 'Submit',
		  	type: 'submit',
		  	id: 'newLeagueSubmit',
		}
	];

	const submitNewLeague = async (event: any) => {
		event.preventDefault()
		
		const data = {
			active: 1,
			full: false,
			name: event.target.leagueName.value
		};
		try {
			const response = await db.set('leagues', data);
			if (response !== null) {
				formHTML.setShowDialog(true);
			}
		} catch (error) {
			console.error('Error adding league:', error);
		}
	
	}

	const newLeagueDone = () => {
		console.log("done");
	}

	const formHTML = new Forms(initialElements,"newLeagueForm",'newLeagueForm',submitNewLeague, true, newLeagueDone);
	return (
		<>
			{formHTML.showForm()}
		</>
	)
}