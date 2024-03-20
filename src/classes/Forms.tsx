"use client";

import FormElementsProp from '@customTypes/FormElementsProp';
import Dialog from '@common/Dialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default class Forms{
	public formElements: FormElementsProp[] = [];
	public formClass: string = "";
	public formName: string = "";
	public formSubmit: (name:string) => Promise<void>;
	public dialog: boolean = false;
	public dialogClose: () => void;
	public showDialog:  any;
	public setShowDialog: any;

	constructor(formElements: FormElementsProp[],
		formClass: string,
		formName: string,
		formSubmit: (name: string) => Promise<void>,
		dialog: boolean,
		dialogClose: () => void
	) {
		this.formElements = formElements;
		this.formClass = formClass;
		this.formName = formName;
		this.formSubmit = formSubmit;
		this.dialog = dialog;
		this.dialogClose = dialogClose;
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

	getInstance() {
        return this;
    }
}

export function ShowForm({ formElements, formClass, formName, formSubmit, dialog, dialogClose, redirrect }:
	{ formElements: FormElementsProp[], formClass: string, formName: string, formSubmit: (name: string) => Promise<void>, dialog: boolean, dialogClose: () => void, redirrect: boolean }) {
	const form = new Forms(formElements, formClass, formName, formSubmit, dialog, dialogClose);
	const formInstance = form.getInstance();
	const [showDialog, setShowDialog] = useState(false);
	const router = useRouter();

	const send = async (event: any) => {
		event.preventDefault();
		setShowDialog(true);
		const response = await formInstance.formSubmit(event.target.leagueName.value);
		if (redirrect === true) {
			router.push(response);
		}
    }

    return (
        <>
			{console.log(formInstance.dialog)}
            {showDialog && formInstance.dialog && <Dialog text="New League added" closeFn={formInstance.dialogClose} />}
	          <form className={formInstance.formClass} name={formInstance.formName} onSubmit={send}>
                {formElements.map((e, index) => (
                    <div key={`${e.type}-${index}`}>
                        {formInstance[e.type](e)}
                    </div>
                ))}
            </form>
        </>
    )
}