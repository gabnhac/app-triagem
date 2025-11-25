import { HealthRisk } from "@/components/RiskLegend/types";

export type RiskLegendResultProps = {
    type: HealthRisk,
    category: string,
    probability: string | null,
    riskIn10Years: string | null,
    tip: string | null,
    score: number | null,
}