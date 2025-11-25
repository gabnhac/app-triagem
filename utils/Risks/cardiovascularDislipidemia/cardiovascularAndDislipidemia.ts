import { CardiovascularDislipidemiaTypeLevels } from "@/components/RiskLegend/types";
import { CardiovascularAndDislipidemiaProps, RiskResultTypeCardiovascularDislipidemia, } from "./@types";
import { maleCardiovascularRisk, maleDislipidemiaRisk, maleRanges } from "./manData";
import { femaleCardiovascularRisk, femaleDislipidemiaRisk, femaleRanges } from "./womanData";

const DEFAULT_RESULT: RiskResultTypeCardiovascularDislipidemia = {
    category: "baixo" as CardiovascularDislipidemiaTypeLevels,
    riskIn10Years: '',
    score: 0
};

export function calculateScoreCardiovascularAndDislipidemia({
    isMan, age, bloodPressure, imc, isDiabetes, isSmoker,
    hdl, ldl, isCardiovascular
}: CardiovascularAndDislipidemiaProps): number {

    if (isMan) {
        let ageScore = 0;

        if (isCardiovascular) {
            const ageScoreCardiovascular = maleRanges.idade.find(item => age >= item.min && age <= item.max);
            if (ageScoreCardiovascular === undefined) return 0;
            ageScore += ageScoreCardiovascular.score;
        } else {
            const ageScoreDislipidemia = maleRanges.dislipidemia_idade.find(item => age >= item.min && age <= item.max);
            if (ageScoreDislipidemia === undefined) return 0;
            ageScore += ageScoreDislipidemia.score;
        }

        let ldlHdlScore = 0;

        if (!hdl || !ldl) {
            const imcScore = maleRanges.imc.find(item => imc >= item.min && imc <= item.max);
            if (imcScore === undefined) return 0;
            ldlHdlScore += imcScore.score;
        } else {
            const ldlScore = maleRanges.colesterolTotal.find(item => ldl >= item.min && ldl <= item.max);
            if (ldlScore === undefined) return 0;

            if (isCardiovascular) {
                const hdlScore = maleRanges.hdl.find(item => hdl >= item.min && hdl <= item.max);
                if (hdlScore === undefined) return 0;
                ldlHdlScore += ldlScore.score + hdlScore.score;
            } else {
                const hdlScore = maleRanges.dislipidemia_hdl.find(item => hdl >= item.min && hdl <= item.max);
                if (hdlScore === undefined) return 0;
                ldlHdlScore += ldlScore.score + hdlScore.score;
            }
        }

        let bloodPresureScore = 0;

        if (bloodPressure.isTreated) {
            if (isCardiovascular) {
                const bp = maleRanges.pas_tratada.find(item => bloodPressure.systolic >= item.min && bloodPressure.systolic <= item.max);
                if (bp === undefined) return 0;
                bloodPresureScore += bp.score;
            } else {
                const bp = maleRanges.dislipidemia_pas_tratada.find(item => bloodPressure.systolic >= item.min && bloodPressure.systolic <= item.max);
                if (bp === undefined) return 0;
                bloodPresureScore += bp.score;
            }
        } else {
            if (isCardiovascular) {
                const bp = maleRanges.pas_nao_tratada.find(item => bloodPressure.systolic >= item.min && bloodPressure.systolic <= item.max);
                if (bp === undefined) return 0;
                bloodPresureScore += bp.score;
            } else {
                const bp = maleRanges.dislipidemia_pas_nao_tratada.find(item => bloodPressure.systolic >= item.min && bloodPressure.systolic <= item.max);
                if (bp === undefined) return 0;
                bloodPresureScore += bp.score;
            }
        }

        const smokerScore = isSmoker ? 4 : 0;
        const diabetesScore = isDiabetes ? 3 : 0;

        return ageScore + ldlHdlScore + bloodPresureScore + smokerScore + diabetesScore;

    } else {

        let ageScore = 0;

        if (isCardiovascular) {
            const ageScoreCardiovascular = femaleRanges.idade.find(item => age >= item.min && age <= item.max);
            if (ageScoreCardiovascular === undefined) return 0;
            ageScore += ageScoreCardiovascular.score;
        } else {
            const ageScoreDislipidemia = femaleRanges.dislipidemia_idade.find(item => age >= item.min && age <= item.max);
            if (ageScoreDislipidemia === undefined) return 0;
            ageScore += ageScoreDislipidemia.score;
        }

        let ldlHdlScore = 0;

        if (!hdl || !ldl) {
            const imcScore = femaleRanges.imc.find(item => imc >= item.min && imc <= item.max);
            if (imcScore === undefined) return 0;
            ldlHdlScore += imcScore.score;
        } else {
            const ldlScore = femaleRanges.colesterolTotal.find(item => ldl >= item.min && ldl <= item.max);
            if (ldlScore === undefined) return 0;

            if (isCardiovascular) {
                const hdlScore = femaleRanges.hdl.find(item => hdl >= item.min && hdl <= item.max);
                if (hdlScore === undefined) return 0;
                ldlHdlScore += ldlScore.score + hdlScore.score;
            } else {
                const hdlScore = femaleRanges.dislipidemia_hdl.find(item => hdl >= item.min && hdl <= item.max);
                if (hdlScore === undefined) return 0;
                ldlHdlScore += ldlScore.score + hdlScore.score;
            }
        }

        let bloodPresureScore = 0;

        if (bloodPressure.isTreated) {
            if (isCardiovascular) {
                const bp = femaleRanges.pas_tratada.find(item => bloodPressure.systolic >= item.min && bloodPressure.systolic <= item.max);
                if (bp === undefined) return 0;
                bloodPresureScore += bp.score;
            } else {
                const bp = femaleRanges.dislipidemia_pas_tratada.find(item => bloodPressure.systolic >= item.min && bloodPressure.systolic <= item.max);
                if (bp === undefined) return 0;
                bloodPresureScore += bp.score;
            }
        } else {
            if (isCardiovascular) {
                const bp = femaleRanges.pas_nao_tratada.find(item => bloodPressure.systolic >= item.min && bloodPressure.systolic <= item.max);
                if (bp === undefined) return 0;
                bloodPresureScore += bp.score;
            } else {
                const bp = femaleRanges.dislipidemia_pas_nao_tratada.find(item => bloodPressure.systolic >= item.min && bloodPressure.systolic <= item.max);
                if (bp === undefined) return 0;
                bloodPresureScore += bp.score;
            }
        }

        const smokerScore = isSmoker ? 4 : 0;
        const diabetesScore = isDiabetes ? 3 : 0;

        return ageScore + ldlHdlScore + bloodPresureScore + smokerScore + diabetesScore;
    }
}

export function calculateRiskCardiovascularAndDislipidemia(
    score: number,
    isMan: boolean,
    isCardiovascular: boolean
): RiskResultTypeCardiovascularDislipidemia {

    if (isMan) {
        if (isCardiovascular) {
            const risk = maleCardiovascularRisk.find(item => score >= item.min && score <= item.max);
            if (!risk) return DEFAULT_RESULT;

            return {
                category: risk.classification as CardiovascularDislipidemiaTypeLevels,
                riskIn10Years: risk.risk,
                score
            };
        } else {
            const risk = maleDislipidemiaRisk.find(item => score >= item.min && score <= item.max);
            if (!risk) return DEFAULT_RESULT;

            return {
                category: risk.classification as CardiovascularDislipidemiaTypeLevels,
                riskIn10Years: risk.risk,
                score
            };
        }
    } else {
        if (isCardiovascular) {
            const risk = femaleCardiovascularRisk.find(item => score >= item.min && score <= item.max);
            if (!risk) return DEFAULT_RESULT;

            return {
                category: risk.classification as CardiovascularDislipidemiaTypeLevels,
                riskIn10Years: risk.risk,
                score
            };
        } else {
            const risk = femaleDislipidemiaRisk.find(item => score >= item.min && score <= item.max);
            if (!risk) return DEFAULT_RESULT;

            return {
                category: risk.classification as CardiovascularDislipidemiaTypeLevels,
                riskIn10Years: risk.risk,
                score
            };
        }
    }
}