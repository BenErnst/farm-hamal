import { useState, type ChangeEvent } from "react";
import type { Element } from "../types/Element";


interface Props {
    element: Element
    updateElement: (elementToUpdate: Element) => void
}


export const Select = (props: Props) => {
    const { element, updateElement } = props;
    const [optionsStr, setOptionsStr] = useState('');


    const setOptions = () => {
        const options = optionsStr.split(',');
        if (options.length) {
            const elementCopy = getElementCopy();
            const cleanOptions = options.map(option => option.trim());
            const uniqueOptions = [...new Set(cleanOptions)];
            elementCopy.options = uniqueOptions.map(option => ({ value: option, alias: option }));
            updateElement(elementCopy);
            setOptionsStr('');
        }
    }


    const handleChangeOption = (ev: ChangeEvent<HTMLSelectElement>) => {
        const elementCopy = getElementCopy();
        elementCopy.value = ev.target.value;
        updateElement(elementCopy);
    }


    const getElementCopy = () => {
        return { ...element };
    }


    return (
        <div>

            {element.name && !element.options?.length ? (
                <div>
                    <label>Enter options seperated by commas</label>
                    <textarea value={optionsStr} onChange={(ev) => setOptionsStr(ev.target.value)} />
                    <button onClick={setOptions} type="button">Set Options</button>
                </div>
            ) : null}

            <select
                id={element.id}
                name={element.name}
                onChange={handleChangeOption}
                disabled={!element.name || !element.options?.length}
            >
                <option value="">{`Choose ${element.name}`}</option>
                {element.options?.map(option => (
                    <option value={option.value} key={option.value}>
                        {option.alias}
                    </option>
                ))}
            </select>

        </div>
    )
}