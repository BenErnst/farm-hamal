import { Checkbox } from 'primereact/checkbox';
import type { Element } from "../types/Element";


interface Props {
    element: Element
    updateElement: (elementToUpdate: Element) => void
}


export const CheckBox = (props: Props) => {
    const { element, updateElement } = props;


    const handleChange = (ev) => {
        const elementCopy = { ...element };
        elementCopy.value = ev.checked;
        updateElement(elementCopy);
    }


    return (
        <>
            {element.name && (
                <Checkbox
                    type='checkbox'
                    id={element.id}
                    name={element.name}
                    checked={element.value as boolean}
                    onChange={handleChange}
                />
            )}
        </>
    )
}