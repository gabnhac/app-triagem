import { HipetensaoLevels } from "@/components/RiskLegend/types";
import { HiterpensaoProps } from "./@types";
import { bloodPressureRanges, RiskResultTypeHipertensao } from "./hipertensaoData";



export function calculateRiskHipertensao({ diastolic, isTreated, systolic }: HiterpensaoProps): RiskResultTypeHipertensao {
    const risk = bloodPressureRanges.find(item => (systolic >= item.pas.min && systolic <= item.pas.max) || (diastolic >= item.pad.min && diastolic <= item.pad.max));
    if (!risk) return {
        classification: 'Normal',
        tip: 'Mantenha hábitos saudáveis e repita a medição uma vez por ano.'
    }

    return {
        classification: risk.classification as HipetensaoLevels,
        tip: risk.tip
    }
}