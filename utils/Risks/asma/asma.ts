import { AsmaLevels } from "@/components/RiskLegend/types";
import { RiskResultTypeAsma } from "./asmaData";

export function calculateRiskAsma(score: number): RiskResultTypeAsma {
    const risk: AsmaLevels = score >= 3 ? 'Não controlada' : (score >= 1 && score <= 2) ? 'Parcialmente controlada' : 'Bem controlada';

    return {
        category: risk,
        score
    }
}