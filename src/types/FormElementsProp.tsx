// types/FormElementsProp.ts
import FormOptionsProp from '@customTypes/FormOptionsProp';

type FormElementsProp = {
	name: string;
  	label: string;
  	type: string;
  	id: string;
  	options?: FormOptionsProp[];
  	value?: string;
  	required?: boolean | null;
  	state?: boolean | null;
}

export default FormElementsProp;