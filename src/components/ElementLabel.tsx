import { useState } from "react";
import type { Element } from "../types/Element";
import { InputText } from 'primereact/inputtext';


interface Props {
    element: Element
    updateElement: (elementToUpdate: Element) => void
}


export const ElementLabel = (props: Props) => {
    const { element, updateElement } = props;
    const [elementName, setElementName] = useState('');


    const updateElementName = () => {
        const elementCopy = { ...element };
        elementCopy.name = elementName;
        updateElement(elementCopy);
    }


    return (
        <div className="form-element-label-container">
            {element.name ? (
                <label htmlFor={element.id}>
                    {element.name}
                </label>
            ) : (
                <section>
                    <InputText type="text" value={elementName} onChange={(ev) => setElementName(ev.target.value)} />
                    <button onClick={updateElementName} type="button">Set Field</button>
                </section>
            )}
        </div>
    )
}