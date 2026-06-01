import { Dropdown } from "primereact/dropdown";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  options: { label: string; value: string }[];
}

export const FormField = (props: Props) => {
  const { name, options } = props;
  const form = useFormContext();
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
            className={error ? "p-invalid" : ""}
          />
        )}
      />
      <small className="p-error">
        {(error as { message: string })?.message}
      </small>
    </div>
  );
};
