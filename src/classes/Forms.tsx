import FormElementsProp from '@customTypes/FormElementsProp';
import Dialog from '@common/Dialog';
import { useState } from 'react';

export default class Forms{
	public formElements: FormElementsProp[] = [];
	public formClass: string = "";
	public formName: string = "";
	public formSubmit: (event: any) => void;
	public dialog: boolean = false;
	public dialogClose: () => void;
	public showDialog: any;
	public setShowDialog: any;

	constructor(formElements: FormElementsProp[],
		formClass: string,
		formName: string,
		formSubmit: (event: any) => void,
		dialog: boolean,
		dialogClose: () => void
	) {
		this.formElements = formElements;
		this.formClass = formClass;
		this.formName = formName;
		this.formSubmit = formSubmit;
		this.dialogClose = dialogClose;
		[this.showDialog, this.setShowDialog] = useState(false);

		//const [showDialog, setShowDialog] = useState(false);
	}

	text(e: FormElementsProp) {
		return (
			<>
				<input {...(e.required === true ? {required: true} : {})} type="text" id={e.id} name={e.name} placeholder={e.label} />
				<label htmlFor={e.id}>{e.label}</label>
			</>
		);
	}

	submit(e: FormElementsProp) {
		return (
			<>
				<button type="submit" id={e.id} name={e.name} title={e.label}>
					{e.label}
				</button>
			</>
		);
	}

	showForm() {
		return (
			<>
				{this.showDialog && <Dialog text="New League added" closeFn={this.dialogClose} />}
				<form onSubmit={this.formSubmit}>
					{this.formElements.map((e, index) => (
						<div key={`${e.type}-${index}`}>
							{this[e.type](e)}
						</div>
					))}
				</form>
			</>
		)
	}
}