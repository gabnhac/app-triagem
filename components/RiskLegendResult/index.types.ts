import { HealthRisk } from "../RiskLegend/types";

export type RiskLegendResultProps = {
    type: HealthRisk,
    category: string,
    riskIn10Years?: string,
    tip?: string,
    probability?: string,
    score?: number,
}

export type RiskLegendResultPropsKeys = keyof RiskLegendResultProps;

export const LabelsEnum: Record<RiskLegendResultPropsKeys, string> = {
    category: "Risco",
    riskIn10Years: "Risco em 10 anos",
    score: "Pontuação",
    type: "Tipo",
    tip: "Recomendação",
    probability: "Probabilidade"
}