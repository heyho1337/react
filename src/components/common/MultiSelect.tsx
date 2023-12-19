class MultiSelect{
	
	multiSelectHTML(name: string,title: string, items, selectedItems){
		return (
			<div className="multiSelect">
				<div className="selectedItems">
					{selectedItems && (
						selectedItems.map((team: {value:number, label:string}) => (
							<span key={team.value}>{team.label}</span>
						))
					)}
				</div>
				<span>Select {title}</span>
				<input type="checkbox" className="hidden peer" />
			  <ul>
					{items.map((option: {value:number, label:string}) => {
						return (
							<li key={option.value}>
								<input
									type="checkbox"
									name={name}
									value={option.value}
									data-title={option.label}
									className="changeable"
								/>
								<label className="ml-1">{option.label}</label>
							</li>
						  );
					})}
				  </ul>
			</div>
		)
	}

	setMultiSelect(elementName: string, useStateName, e) {
		const checkedItems = Array.from(
			document.getElementsByName(elementName)
		)
		.filter((checkbox) => checkbox.checked)
		.map((checkbox) => ({
			value: checkbox.value,
			label: checkbox.dataset.title,
		}));
		console.log(checkedItems);
		useStateName(checkedItems);
	}
}

const multiSelect = new MultiSelect();
export default multiSelect;