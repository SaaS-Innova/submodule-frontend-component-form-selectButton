import { Controller, useFormContext } from "react-hook-form";
import { inputValidator } from "../../../../library/utilities/helperFunction";
import { SelectButton } from "primereact/selectbutton";
import { ISelectButton } from "./selectButton.model";
import { IFormFieldType } from "../../../../library/utilities/constant";
import { FormFieldError } from "../formFieldError/FormFieldError";

export const SelectButtons = (props: ISelectButton) => {
  const {
    attribute,
    form,
    fieldType,
    optionLabel = "label",
    optionValue = "value",
  } = props;
  const { label, options, rules } = form[attribute];
  const { required, disabled, multiple = true } = form[attribute].rules;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const getClassNames = () => {
    let labelClassName = "";
    let fieldClassName = "";
    let divClassName = "";

    switch (fieldType) {
      case IFormFieldType.NO_LABEL:
        labelClassName = "";
        fieldClassName = "field p-fluid";
        divClassName = "";
        break;
      case IFormFieldType.TOP_LABEL:
        labelClassName = "";
        fieldClassName = "field p-fluid";
        divClassName = "";
        break;
      default:
        labelClassName = "col-12 md:col-3 md:mb-0";
        fieldClassName = "field grid flex-nowrap";
        divClassName = "flex flex-column px-2";
        break;
    }

    return { labelClassName, fieldClassName, divClassName };
  };
  const { labelClassName, fieldClassName, divClassName } = getClassNames();

  const labelElement = (
    <label htmlFor={attribute} className={labelClassName}>
      {label} {required && "*"}
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
              onChange={(e) => {
                field.onChange(e.value);
              }}
            />
          )}
        />
        <FormFieldError data={{ errors, name: attribute }} />
      </div>
    </div>
  );
};
