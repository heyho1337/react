import { ShowForm } from '@class/Forms';
import FormElementsProp from '@customTypes/FormElementsProp';
import league from '@class/League';

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

	async function newLeagueDone(){
		"use server";
		console.log("done");
	}

	async function handleSubmit(name: string){
		"use server";
		const response = await league.submitNewLeague(name);
		if (response === true) {
			return "/league/" + league.newLeagueId;
		}
    };

	//const formHTML = new form(initialElements,"newLeagueForm",'newLeagueForm',handleSubmit, true, newLeagueDone);
	return (
        <>
			<ShowForm redirrect={true} formElements={initialElements} formClass='newLeagueForm' formName='newLeagueForm' formSubmit={handleSubmit} dialog={true} dialogClose={newLeagueDone} />
        </>
    )
}