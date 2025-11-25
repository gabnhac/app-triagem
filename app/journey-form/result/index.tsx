import { Icon } from "@/components/Icon";
import { RiskLegendResult } from "@/components/RiskLegendResult";
import { useAppStore } from "@/store/useAppStore";
import theme from "@/theme";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Result() {
    const {
        resultData
    } = useAppStore();

    const router = useRouter();

    return (
        <ScrollView style={styles.wrapper} contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10, gap: 10, paddingBottom: 200 }}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => router.dismiss()}>
                    <Icon
                        iconLib="Feather"
                        iconName="arrow-left"
                        size={30}
                        color=""
                    />
                </TouchableOpacity>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Estimativas</Text>
                </View>
            </View>
            <View style={{ gap: 30 }}>
                {resultData.map((item, index) => (
                    <RiskLegendResult
                        key={index}
                        category={item.category}
                        score={item.score}
                        riskIn10Years={item.riskIn10Years}
                        type={item.type}
                        probability={item.probability}
                        tip={item.tip}
                    />
                ))}
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    headerWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        paddingVertical: 10
    },
    titleWrapper: {
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: '-50%' }]
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        color: theme.colors.textDefault
    }

});