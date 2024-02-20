class Filters {

	setParamsServer = (params: any) => {
		let paramsValue: any;
		if (params != '') {
			try {
				paramsValue = JSON.parse(params);
			}
			catch (error) {
				paramsValue = [];
			}
			if (!Array.isArray(paramsValue)) {
				paramsValue = [paramsValue];
			}
			else {
				return paramsValue;
			}
		}
		else {
			paramsValue = {};
		}
		return paramsValue;
	}

	setParamsClient = (params: any) => {
		let paramsValue: any;
		if (params != '') {
			paramsValue = JSON.parse(params);
			if (!Array.isArray(paramsValue)) {
				paramsValue = [paramsValue];
			}
			else {
				return paramsValue;
			}
		}
		else {
			paramsValue = {};
		}
		return paramsValue;
	}

}

const filters = new Filters();
export default filters;