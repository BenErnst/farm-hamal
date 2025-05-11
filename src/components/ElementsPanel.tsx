import { useMemo, type Dispatch, type SetStateAction } from "react";
import { FormService } from "../services/FormService";
import { UtilService } from "../services/UtilService";
import type { Element } from "../types/Element";


interface Props {
    setCurrElements: Dispatch<SetStateAction<Element[]>>
}


export const ElementsPanel = (props: Props) => {
    const { setCurrElements } = props;
    const elements = useMemo(() => FormService.getElements(), []);


    const injectElement = (element: Element) => {
        const newElement = { ...element };
        newElement.id = UtilService.makeId();
        setCurrElements(prevElements => [...prevElements, newElement]);
    }


    return (
        <div className="form-elements-panel-container">
            {elements.map(element => (
                <button
                    onClick={() => injectElement(element)}
                    key={element.id}
                >
                    {element.type}
                </button>
            ))}
        </div>
    )
}

