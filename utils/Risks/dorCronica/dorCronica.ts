import { DorCronicaLevels } from "@/components/RiskLegend/types";
import { RiskResultTypeDorCronica } from "./@types";

export function calculateRiskDorCronica(score: number): RiskResultTypeDorCronica {
    let risk: DorCronicaLevels = 'Leve';

    if (score >= 9 && score <= 17) {
        risk = 'Moderada'
    } else if (score >= 18 && score <= 25) {
        risk = 'Forte'
    } else if (score >= 26 && score <= 30) {
        risk = 'Muito forte'
    }

    return {
        score,
        category: risk
    }
}