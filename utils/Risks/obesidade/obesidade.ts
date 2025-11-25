import { ObesidadeLevels } from "@/components/RiskLegend/types";
import { ObesidadeProps } from "./@types";
import { obesityRanges, RiskResultTypeObesidade } from "./obesidadeData";

export function calculateScoreObesidade({ dietIsHealthy, familyWithObesity, isAlcoholic, isSmoker, practiceExercise }: ObesidadeProps) {
    const dietScore = dietIsHealthy ? 0 : 2;

    const familyWithObesityScore = familyWithObesity ? 1 : 0;

    const isAlcoholicScore = isAlcoholic ? 1 : 0;

    const isSmokerScore = isSmoker ? 1 : 0;

    const practiceExerciseScore = practiceExercise ? 0 : 2;

    return practiceExerciseScore + isSmokerScore + isAlcoholicScore + familyWithObesityScore + dietScore;
}

export function calculateRiskObesidade(score: number): RiskResultTypeObesidade {
    const risk = obesityRanges.find(item => score >= item.min && score <= item.max);
    if (!risk) return {
        classification: "Muito baixo",
        score
    }

    return {
        classification: risk.classification as ObesidadeLevels,
        score
    }
}