import { DiabetesLevels } from "@/components/RiskLegend/types";
import { DiabetesTipo2Props } from "./@types";
import { diabetesRanges, diabetesRiskLevels, RiskResultTypeDiabetesTipo2 } from "./diabetesData";

const DEFAULT_RESULT: RiskResultTypeDiabetesTipo2 = {
    classification: "Baixo",
    probability: "Cerca de 1 em cada 100 pessoas irá desenvolver a doença",
    score: 0,
    tip: "Orientações gerais de estilo de vida"
};

export function calculateScoreDiabetesTipo2({
    age,
    bloodPressureMedication,
    eatVegetablesEveryDay,
    familyWithDiabetes,
    highGlucose,
    imc,
    practiceExercise,
    waistCircumference,
    isMan
}: DiabetesTipo2Props) {
    const ageScore = diabetesRanges.idade.find(item => age >= item.min && age <= item.max)?.score;
    if (ageScore === undefined) {
        console.log("AGE")
        return 0
    }

    const imcScore = diabetesRanges.imc.find(item => imc >= item.min && imc <= item.max)?.score;
    if (imcScore === undefined) {
        console.log("IMC")
        return 0
    }

    let circumferenceScore = 0;

    if (isMan) {
        const circumferenceScoreMan = diabetesRanges.cintura_man.find(item => waistCircumference >= item.min && waistCircumference <= item.max)?.score;
        if (circumferenceScoreMan === undefined) {
            console.log("CIRCUM")
            return 0
        }

        circumferenceScore += circumferenceScoreMan;
    } else {
        const circumferenceScoreWoman = diabetesRanges.cintura_woman.find(item => waistCircumference >= item.min && waistCircumference <= item.max)?.score;
        if (circumferenceScoreWoman === undefined) {
            console.log("CIRCUM")
            return 0
        }

        circumferenceScore += circumferenceScoreWoman;
    }

    const exerciseScore = practiceExercise ? 0 : 2;

    const vegetableScore = eatVegetablesEveryDay ? 0 : 1;

    const pressureScore = bloodPressureMedication ? 0 : 2;

    const glucoseScore = highGlucose ? 5 : 0;

    const familyScore = familyWithDiabetes === 0 ? 0 :
        familyWithDiabetes === 1 ? 5 : 3

    return ageScore + imcScore + circumferenceScore + exerciseScore + vegetableScore + pressureScore + glucoseScore + familyScore;
}

export function calculateRiskDiabetesTipo2(score: number): RiskResultTypeDiabetesTipo2 {
    const risk = diabetesRiskLevels.find(item => score >= item.min && score <= item.max);
    if (!risk) return DEFAULT_RESULT

    return {
        classification: risk.classification as DiabetesLevels,
        probability: risk.probability,
        score,
        tip: risk.tip
    }
}