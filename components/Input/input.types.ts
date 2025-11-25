import { Mask } from "react-native-mask-input";

export type InputVariant = "primary" | "secondary";

export type InputProps = {
    value: string;
    onChangeValue: (value: string) => void;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    variant?: InputVariant;
    mask?: Mask;

};