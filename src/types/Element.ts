export interface Element {
    id: string
    type: string
    name: string
    value: string | boolean
    options?: Option[]
}

interface Option {
    value: string
    alias: string
}