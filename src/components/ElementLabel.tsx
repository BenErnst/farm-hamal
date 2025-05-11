import { useState } from "react";
import type { Element } from "../types/Element";


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
                <div>
                    <input type="text" value={elementName} onChange={(ev) => setElementName(ev.target.value)} />
                    <button onClick={updateElementName} type="button">Set Name</button>
                </div>
            )}
        </div>
    )
}