import { RiskLegendResultProps } from "@/store/storeTypes";
import { StyleSheet, Text, View } from "react-native";
import theme from '../../theme';
import { RiskColorEnum, RiskLabelEnum } from "../RiskLegend/types";
import { LabelsEnum, RiskLegendResultPropsKeys } from "./index.types";

export function RiskLegendResult(data: RiskLegendResultProps) {

    const validData = Object.entries(data).filter(([key, value]) => key !== 'type' && value !== null);

    return (
        <View style={styles.wrapper}>
            <View style={[styles.headerWrapper, {
                backgroundColor: RiskColorEnum[data.type]
            }]}>
                <Text style={styles.labelRisk}>{RiskLabelEnum[data.type]}</Text>
            </View>

            {validData.map(([key, value], index) => {
                const color = index % 2 === 0 ? theme.colors.background_gray_300 : theme.colors.background;

                const label = LabelsEnum[key as RiskLegendResultPropsKeys] || key;

                return (
                    <View key={key} style={[styles.tableRowWrapper, {
                        backgroundColor: color
                    }]}>
                        <View style={styles.firstWrapper}>
                            <Text style={styles.textLabel}>
                                {label}
                            </Text>
                        </View>
                        <View style={styles.secondWrapper}>
                            <Text style={styles.textValue}>
                                {value}
                            </Text>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'column',
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 5
    },
    tableRowWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    firstWrapper: {
        flex: 0.4,
        paddingRight: 10,
    },
    secondWrapper: {
        flex: 0.5,
        alignItems: 'flex-end',
    },
    textLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.textDefault,
        flexWrap: 'wrap',
    },
    textValue: {
        fontSize: 14,
        fontWeight: '400',
        color: theme.colors.textDefault,
        textAlign: 'right',
        flexWrap: 'wrap',
    },
    labelRisk: {
        fontSize: 16,
        color: theme.colors.white,
        fontWeight: '700'
    },
});