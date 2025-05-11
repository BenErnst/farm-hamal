import type { ChangeEvent } from "react";
import type { Element } from "../types/Element";


interface Props {
    element: Element
    updateElement: (elementToUpdate: Element) => void
}


export const TextInput = (props: Props) => {
    const { element, updateElement } = props;


    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const elementCopy = { ...element };
        elementCopy.value = ev.target.value;
        updateElement(elementCopy);
    }


    return (
        <input
            type='text'
            id={element.id}
            name={element.name}
            value={element.value as string}
            onChange={handleChange}
            disabled={!element.name}
        />
    )
}