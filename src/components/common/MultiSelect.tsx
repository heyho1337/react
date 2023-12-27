import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
class MultiSelect{
	
	multiSelectHTML(id:number, name: string,title: string, items, selectedItems){
		return (
			<>
				<div className={`selectedItems select-${id}`}>
					<label>Selected {title}</label>
					{selectedItems && (
						selectedItems.map((item: { value: number, label: string }) => (
							<button data-title={item.label} className="changeable" name={`selected-${name}`} value={item.value} key={item.value}>{item.label}</button>
						))
					)}
				</div>
				<div className={`multiSelect select-${id}`}>
					<input type="checkbox" className="hidden peer" />
					<span>Select {title} <FontAwesomeIcon icon={faAngleRight} /></span>
					<ul>
						{items && items.length > 0 && (
							items.map((option: { value: number, label: string }) => {
								return option.label && (
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
							})
						)}
					</ul>
				</div>
			</>
		)
	}

	removeSelectedElement(selectedElements, valueToRemove, originalSelect) {
		const updatedElements = selectedElements
		.filter((element) => element.value !== valueToRemove.value)
		.map((checkbox) => ([
			checkbox.value
		]));
		const selectedCheckboxes = Array.from(
			document.getElementsByName(originalSelect)
		).forEach((element) => {
			if (element.value === valueToRemove.value) {
				element.checked = false;
			}
		});
		return updatedElements;
	}
	
	setMultiSelect(elementName: string) {
		const checkedItems = Array.from(
			document.getElementsByName(elementName)
		)
		.filter((checkbox) => checkbox.checked)
		.map((checkbox) => checkbox.value);
		return checkedItems;
	}
	

	createSelectedItems(checkedItems: HTMLInputElement[], selectedArray: any[]) {
		const selectedItems = checkedItems
		.filter((checkbox) => {
			const isChecked = selectedArray.includes(parseInt(checkbox.value));
            checkbox.checked = isChecked;
            return isChecked;
		})
		.map((checkbox) => ({
			value: checkbox.value,
			label: checkbox.dataset.title,
		}));
		return selectedItems;
	}
}

const multiSelect = new MultiSelect();
export default multiSelect;