import { ObesidadeLevels } from "@/components/RiskLegend/types";

export type RiskResultTypeObesidade = {
    classification: ObesidadeLevels,
    score: number,
}

export const obesityRanges = [
    {
        classification: "Muito baixo",
        min: 0,
        max: 1
    },
    {
        classification: "Leve",
        min: 2,
        max: 2
    },
    {
        classification: "Moderado",
        min: 3,
        max: 3
    },
    {
        classification: "Alto",
        min: 4,
        max: 5
    },
    {
        classification: "Muito alto",
        min: 6,
        max: 7
    }
];