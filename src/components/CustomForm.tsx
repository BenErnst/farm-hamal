import { type FormEvent } from "react";
import type { Element } from "../types/Element";
import { FormElement } from "./FormElement";
import { useAppDispatch } from "../hooks/useStoreTypes";
import { addEntity } from "../store/actions/EntityActions";
import { UtilService } from "../services/UtilService";
import type { Entity } from "../types/Entity";


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
        }, {}) as Entity;
        newEntity.id = UtilService.makeId();
        dispatch(addEntity(newEntity));
        setCurrElements([]);
    }


    const isFormNotFilled = () => {
        const noElements = !currElements.length;
        const isSomethingEmpty = currElements.some(element => element.value === '' || element.name === '');
        return noElements || isSomethingEmpty;
    }


    return (
        <form className="custom-form-container" onSubmit={submit}>

            <div>

                <h2>Form</h2>

                <div>
                    {currElements.length ? currElements.map((element: Element) => (
                        <FormElement
                            element={element}
                            setCurrElements={setCurrElements}
                            key={element.id}
                        />
                    )) : null}
                </div>

            </div>

            <div className="submit-btn-container">
                <button type="submit" disabled={isFormNotFilled()}>
                    {'Submit'}
                </button>
            </div>

        </form>
    )
}