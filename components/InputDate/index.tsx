import theme from "@/theme";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { InputDateProps } from "./index.types";

export function InputDate({
    onChangeDate,
    value,
    variant,
    label,
    errorMessage
}: InputDateProps) {
    const [openDate, setOpenDate] = useState(false);

    const color = variant === 'primary' ? theme.colors.blueDefault : theme.colors.green;

    const minDate = useMemo(() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 20);
        return d;
    }, [])

    return (

        <View style={styles.wrapper}>
            {label && (
                <Text style={styles.label}>
                    {label}
                </Text>
            )}

            <Pressable
                style={[styles.inputContainer, {
                    borderWidth: 1,
                    borderColor: color
                }]}
                onPress={() => setOpenDate(true)}
            >
                <Text style={styles.textDate}>{value.toLocaleDateString('pt-br')}</Text>

            </Pressable>
            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            {openDate && (
                <DateTimePicker
                    mode="date"
                    value={value}
                    maximumDate={(() => {
                        const d = new Date();
                        d.setFullYear(d.getFullYear() - 20);
                        return d;
                    })()}
                    onChange={(event, selectedDate) => {
                        if (event.type === "dismissed") {
                            setOpenDate(false);
                            return;
                        }

                        if (selectedDate) {
                            onChangeDate(selectedDate);
                        }

                        setOpenDate(false);
                    }}
                />
            )}
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

    textDate: {
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

