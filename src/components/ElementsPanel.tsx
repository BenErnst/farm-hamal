import { PanelMenu } from 'primereact/panelmenu';
import { useMemo, type Dispatch, type SetStateAction } from "react";
import { FormService } from "../services/FormService";
import { UtilService } from "../services/UtilService";
import type { Element } from "../types/Element";


interface Props {
    setCurrElements: Dispatch<SetStateAction<Element[]>>
}


export const ElementsPanel = (props: Props) => {
    const { setCurrElements } = props;
    const items = useMemo(() => {
        const elements = FormService.getElements();
        return elements.map(element => ({
            command: () => injectElement(element),
            template: (
                <div style={{ textAlign: 'center' }}>
                    <h3>{element.type}</h3>
                </div>
            )
        }))
    }, []);


    const injectElement = (element: Element) => {
        const newElement = { ...element };
        newElement.id = UtilService.makeId();
        setCurrElements(prevElements => [...prevElements, newElement]);
    }


    return (
        <div className="elements-panel-container">
            <PanelMenu model={items} />
        </div>
    )
}

