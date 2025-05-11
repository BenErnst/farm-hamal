import type { ChangeEvent } from "react";
import type { Element } from "../types/Element";


interface Props {
    element: Element
    updateElement: (elementToUpdate: Element) => void
}


export const Checkbox = (props: Props) => {
    const { element, updateElement } = props;


    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const elementCopy = { ...element };
        elementCopy.value = ev.target.checked;
        updateElement(elementCopy);
    }


    return (
        <>
            {element.name && (
                <input
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