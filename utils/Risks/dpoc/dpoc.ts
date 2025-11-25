import { DpocLevels } from "@/components/RiskLegend/types";
import { DpocProps, RiskResultTypeDPOC } from "./@types";

export function calculateRiskDPOC({ cat, crisesDPOC, grauDispneia }: DpocProps): RiskResultTypeDPOC {
    let risk: DpocLevels = 'GOLD A - Poucos sintomas, baixo risco';

    if ((grauDispneia >= 2 || cat >= 10) && crisesDPOC <= 1) {
        risk = 'GOLD C - Muitos sintomas, baixo risco'
    } else if ((grauDispneia <= 1 || cat < 10) && crisesDPOC >= 2) {
        risk = 'GOLD B - Poucos sintomas, alto risco'
    } else if ((grauDispneia >= 2 || cat >= 10) && crisesDPOC >= 2) {
        risk = 'GOLD D - Muitos sintomas, alto risco'
    }

    return {
        score: cat,
        category: risk
    }
}