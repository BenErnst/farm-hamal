import { type FormEvent } from "react";
import type { Element } from "../types/Element";
import { FormElement } from "./FormElement";
import { useAppDispatch } from "../hooks/useStoreTypes";
import { addEntity } from "../store/actions/EntityActions";


interface Props {
    currElements: Element[]
    setCurrElements: React.Dispatch<React.SetStateAction<Element[]>>
}


export const CustomForm = (props: Props) => {
    const { currElements, setCurrElements } = props;
    const dispatch = useAppDispatch();


    const submit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const newEntity = currElements.reduce((acc, element) => {
            acc[element.name] = element.value;
            return acc;
        }, {});
        dispatch(addEntity(newEntity));
    }


    // const getElementComponent = (element: Element) => {
    //     return element.type === 'TextInput' ? <TextInput /> : element.type === 'Checkbox' ? <Checkbox /> : <Select />;
    // }


    const isFormNotFilled = () => {
        const textElements = currElements.filter(element => element.type !== 'Checkbox');
        return textElements.some(element => element.value === '');
    }


    return (
        <form className="custom-form-container" onSubmit={submit}>

            <h1>CustomForm</h1>

            {currElements.length ? currElements.map((element: Element) => (
                <FormElement
                    element={element}
                    setCurrElements={setCurrElements}
                    key={element.id}
                />
            )) : null}

            <button type="submit" disabled={isFormNotFilled()}>
                {'Submit'}
            </button>

        </form>
    )
}