import theme from "@/theme";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MaskInput from 'react-native-mask-input';
import { InputProps } from "./input.types";


export function Input({
    label,
    placeholder,
    value,
    errorMessage,
    onChangeValue,
    variant = 'primary',
    mask,
}: InputProps) {
    const [isFocus, setIsFocus] = useState(false);

    const color = variant === 'primary' ? theme.colors.blueDefault : theme.colors.green;

    return (

        <View style={styles.wrapper}>
            {label && (
                <Text style={styles.label}>
                    {label}
                </Text>
            )}
            <View style={{
                borderRadius: 8,
                padding: 1,
                backgroundColor: isFocus ? color : theme.colors.background
            }}>
                <View
                    style={[styles.inputContainer, {
                        borderWidth: 1,
                        borderColor: color
                    }]}
                >
                    <MaskInput
                        placeholder={placeholder}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        keyboardType='number-pad'
                        onChangeText={(masked) => onChangeValue(masked)}
                        mask={mask}
                        style={[
                            styles.input
                        ]}
                    />
                </View>
            </View>
            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
        </View>

    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        flexDirection: "column",
    },

    label: {
        marginBottom: 6,
        fontWeight: "bold",
        color: theme.colors.textDefault,
        fontSize: 14,
    },

    inputContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
    },

    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
        color: theme.colors.black,
    },

    errorText: {
        color: theme.colors.input_error,
        fontSize: 12,
        marginTop: 4,
        fontWeight: "500",
    },
});

