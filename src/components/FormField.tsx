import { Dropdown } from "primereact/dropdown"
import { Controller } from "react-hook-form"

interface Props {
    name: string
    form: any
    options: { label: string; value: string }[]
}

export const FormField = (props: Props) => {
    const { name, form, options } = props;
    const error = form.formState.errors[name];

    return (
        <div className="form-field">
            <Controller
                name={name}
                control={form.control}
                render={({ field }) => (
                    <Dropdown
                        {...field}
                        options={options}
                        className={error ? 'p-invalid' : ''}
                    />
                )}
            />
            {error && <small className="p-error">{error.message}</small>}
        </div>
    )
}