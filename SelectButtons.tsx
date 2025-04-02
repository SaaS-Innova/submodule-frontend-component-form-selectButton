import { Controller, useFormContext } from "react-hook-form";
import { inputValidator } from "../../../../library/utilities/helperFunction";
import { SelectButton } from "primereact/selectbutton";
import { ISelectButton } from "./selectButton.model";
import { IFormFieldType } from "../../../../library/utilities/constant";
import { FormFieldError } from "../formFieldError/FormFieldError";
import { useMemo } from "react";

export const SelectButtons = (props: ISelectButton) => {
  const {
    attribute,
    form,
    fieldType,
    handleChange,
    optionLabel = "label",
    optionValue = "value",
    allowEmpty = false,
  } = props;
  const { label, options, rules } = form[attribute];
  const { required, disabled, multiple = true } = form[attribute].rules;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { labelClassName, fieldClassName, divClassName } = useMemo(() => {
    switch (fieldType) {
      case IFormFieldType.NO_LABEL:
      case IFormFieldType.TOP_LABEL:
        return {
          labelClassName: "",
          fieldClassName: "field p-fluid",
          divClassName: "",
        };
      default:
        return {
          labelClassName: "col-12 md:col-3 md:mb-0",
          fieldClassName: "field grid flex-nowrap",
          divClassName: "flex flex-column px-2",
        };
    }
  }, [fieldType]);

  const labelElement = (
    <label htmlFor={attribute} className={labelClassName}>
      <span className="capitalize-first">
        {label} {required && "*"}
      </span>
    </label>
  );

  return (
    <div className={fieldClassName}>
      {fieldType !== IFormFieldType.NO_LABEL && labelElement}
      <div className={divClassName}>
        <Controller
          name={attribute}
          control={control}
          rules={inputValidator(rules, label)}
          render={({ field }) => (
            <SelectButton
              id={field.name}
              multiple={multiple}
              className="flex flex-wrap w-full"
              optionLabel={optionLabel}
              optionValue={optionValue}
              value={field.value}
              options={options}
              disabled={disabled}
              allowEmpty={allowEmpty}
              onChange={(e) => {
                field.onChange(e.value);
                handleChange && handleChange(e.value);
              }}
            />
          )}
        />
        <FormFieldError data={{ errors, name: attribute }} />
      </div>
    </div>
  );
};
