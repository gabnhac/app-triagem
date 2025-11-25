
export type RiskLegendResultPropsKeys = 'type' | 'score' | 'tip' | 'riskIn10Years' | 'probability' | 'category';

export const LabelsEnum: Record<RiskLegendResultPropsKeys, string> = {
    category: "Risco",
    riskIn10Years: "Risco em 10 anos",
    score: "Pontuação",
    type: "Tipo",
    tip: "Recomendação",
    probability: "Probabilidade"
}