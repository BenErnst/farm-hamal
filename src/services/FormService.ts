import type { FormElement } from "../types/FormElement"

export const FormService = {
    getFormElements
}


function getFormElements(): FormElement[] {
    return [
        {
            element: 'input',
            type: 'text',
            name: '',
            label: ''
        },
        {
            element: 'input',
            type: 'checkbox',
            name: '',
            label: ''
        },
        {
            element: 'select',
            options: [],
            name: '',
            label: ''
        },
    ]
}