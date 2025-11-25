import { Pressable, StyleSheet, Text, View } from "react-native";
import theme from '../../theme';
import { Icon } from "../Icon";
import { LevelColorEnum, RiskColorEnum, RiskLabelEnum, RiskLegendProps, RiskLevelEnum } from "./types";

export function RiskLegend({ type, isSelected, onSelect }: RiskLegendProps) {

    return (
        <View style={styles.wrapper}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Pressable style={styles.headerWrapper} onPress={() => onSelect(type)}>
                    <Icon
                        iconLib="MaterialIcons"
                        iconName={isSelected ? "radio-button-checked" : "radio-button-unchecked"}
                        size={20}
                        color={theme.colors.green}
                    />
                    <View style={[styles.riskWrapper, {
                        backgroundColor: RiskColorEnum[type]
                    }]}>
                        <Text style={styles.labelRisk}>{RiskLabelEnum[type]}</Text>
                    </View>
                </Pressable>
                {isSelected &&
                    <View style={styles.risksWrapper}>
                        {RiskLevelEnum[type].map((item, index) => (
                            <View key={index} style={styles.riskLevelWrapper}>
                                <Icon
                                    iconLib="Entypo"
                                    iconName="minus"
                                    size={15}
                                    color={LevelColorEnum[type]}
                                />
                                <View style={[styles.riskLevel, {
                                    backgroundColor: LevelColorEnum[type]
                                }]}>

                                    <Text style={styles.labelLevel}>{item}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 5,
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginLeft: 5
    },
    riskWrapper: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    labelRisk: {
        fontSize: 16,
        color: theme.colors.white,
        fontWeight: 700
    },
    risksWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 5
    },
    riskLevelWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 5
    },
    riskLevel: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8
    },
    labelLevel: {
        fontSize: 14,
        fontWeight: 700,
        color: theme.colors.textDefault
    }
})