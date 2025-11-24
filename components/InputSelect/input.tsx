import theme from "@/theme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { InputSelectProps, OptionType } from "./input.types";


export function InputSelect({
    statement,
    options,
    onSelect,
    isError = false
}: InputSelectProps) {
    const [selected, setSelected] = useState<OptionType | null>();

    return (
        <View style={styles.wrapper} >
            <Text style={styles.label}>
                {statement} <Text style={[styles.label, {
                    color: theme.colors.input_error
                }]}>{isError && '*'}</Text>
            </Text>
            <View style={styles.optionsWrapper}>
                {options.map((item, index) => {
                    const color = index % 2 === 0 ? theme.colors.blueDefault : theme.colors.green;

                    return (
                        <Pressable key={index} style={[styles.option, {
                            borderColor: color,
                            backgroundColor: selected === item ? color : 'white'
                        }]} onPress={() => {
                            setSelected(item)
                            onSelect(item)

                        }}>
                            <Text style={[styles.optionText, {
                                color: selected === item ? theme.colors.white : color
                            }]}>{item.affirmative}</Text>
                        </Pressable>
                    )
                })}
            </View>
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
    optionsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 15
    },
    option: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        borderWidth: 1
    },
    optionText: {
        fontWeight: 700,
    }
});

