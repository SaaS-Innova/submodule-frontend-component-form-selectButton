import { IAttribute_Object } from "../formInterface/forms.model";

export interface ISelectButton {
  attribute: string;
  form: {
    [attribute: string]: IAttribute_Object;
  };
  optionLabel?: string;
  optionValue?: string;
  handleChange?: (data: any) => void;
  fieldType?: "top-label" | "no-label";
  allowEmpty?: boolean;
}
