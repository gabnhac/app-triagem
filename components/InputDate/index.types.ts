import { InputVariant } from "../Input/input.types";

export type InputDateProps = {
    value: Date,
    onChangeDate: (date: Date) => void;
    variant?: InputVariant;
    errorMessage?: string;
    label?: string;
}