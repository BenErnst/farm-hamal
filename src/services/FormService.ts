import type { Element } from "../types/Element"
import { UtilService } from "./UtilService"


export const FormService = {
    getElements
}


const { makeId } = UtilService;


function getElements(): Element[] {
    return [
        {
            id: makeId(),
            type: 'TextInput',
            name: '',
            value: ''
        },
        {
            id: makeId(),
            type: 'CheckBox',
            name: '',
            value: false
        },
        {
            id: makeId(),
            type: 'Select',
            name: '',
            value: '',
            options: []
        },
    ]
}