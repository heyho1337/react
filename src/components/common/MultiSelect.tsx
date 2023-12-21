import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
class MultiSelect{
	
	multiSelectHTML(id:number, name: string,title: string, items, selectedItems){
		return (
			<>
				{name !== 'selectTeam' && (
					<div className={`selectedItems select-${id}`}>
						<label>Selected {title}</label>
						{selectedItems && (
							selectedItems.map((item: { value: number, label: string }) => (
								<button data-title={item.label} className="changeable" name={`selected-${name}`} value={item.value} key={item.value}>{item.label}</button>
							))
						)}
					</div>
				)}
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

	removeSelectedElement(selectedElements, setSelectedElements, valueToRemove, originalSelect) {
		const updatedElements = selectedElements.filter((element) => element.value !== valueToRemove);
		const selectedCheckboxes = Array.from(
			document.getElementsByName(originalSelect)
		).forEach((element) => {
			if (element.value === valueToRemove) {
				element.checked = false;
			}
		});
		setSelectedElements(updatedElements);
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
		useStateName(checkedItems);
	}
}

const multiSelect = new MultiSelect();
export default multiSelect;