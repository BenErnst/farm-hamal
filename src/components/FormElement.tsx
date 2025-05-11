import { useState } from "react";
import { TextInput } from "./TextInput";
import { Checkbox } from "./Checkbox";
import { Select } from "./Select";
import { ElementLabel } from "./ElementLabel";
import type { Element } from "../types/Element";


interface Props {
    element: Element
    setCurrElements: React.Dispatch<React.SetStateAction<Element[]>>
}


export const FormElement = (props: Props) => {
    const { element, setCurrElements } = props;

    const updateElement = (elementToUpdate: Element) => {
        setCurrElements(prevElements => {
            const elementIndex = prevElements.findIndex(el => el.id === element.id);
            const prevElementsCopy = [...prevElements];
            prevElementsCopy.splice(elementIndex, 1, elementToUpdate);
            return prevElementsCopy;
        });
    }


    const removeElement = () => {
        setCurrElements(prevElements => {
            const elementIndex = prevElements.findIndex(el => el.id === element.id);
            const prevElementsCopy = [...prevElements];
            prevElementsCopy.splice(elementIndex, 1);
            return prevElementsCopy;
        })
    }


    // const getElementIndex = (elements: Element[],elementToUpdate) => {
    //     return elements.findIndex(el => el.id === element.id);
    // }


    return (
        <div className="form-element-container">

            <ElementLabel element={element} updateElement={updateElement} />

            {element.type === 'TextInput' ? <TextInput element={element} updateElement={updateElement} />
                : element.type === 'Checkbox' ? <Checkbox element={element} updateElement={updateElement} />
                    : <Select element={element} updateElement={updateElement} />
            }

            <button onClick={removeElement} type="button">
                {'Remove'}
            </button>

        </div>
    )
}