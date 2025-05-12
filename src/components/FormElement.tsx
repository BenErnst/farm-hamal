import type { Element } from "../types/Element";
import { CheckBox } from "./Checkbox";
import { ElementLabel } from "./ElementLabel";
import { Select } from "./Select";
import { TextInput } from "./TextInput";


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


    return (
        <div className="form-element-container">

            <h4>{element.type}</h4>

            <ElementLabel element={element} updateElement={updateElement} />

            {element.type === 'TextInput' ? <TextInput element={element} updateElement={updateElement} />
                : element.type === 'CheckBox' ? <CheckBox element={element} updateElement={updateElement} />
                    : <Select element={element} updateElement={updateElement} />
            }

            <div className="remove-btn-container">
                <button onClick={removeElement} type="button">
                    {'Remove'}
                </button>
            </div>

        </div>
    )
}