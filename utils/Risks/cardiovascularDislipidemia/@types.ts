import { CardiovascularDislipidemiaTypeLevels } from '@/components/RiskLegend/types';

export type BloodPressureType = {
    systolic: number,
    diastolic: number,
    isTreated: boolean,
}

export type CardiovascularAndDislipidemiaProps = {
    age: number,
    ldl?: number,
    hdl?: number,
    imc: number,
    bloodPressure: BloodPressureType,
    isSmoker: boolean,
    isDiabetes: boolean,
    isMan: boolean,
    isCardiovascular: boolean,
}

export type RiskResultTypeCardiovascularDislipidemia = {
    score: number,
    riskIn10Years: string,
    category: CardiovascularDislipidemiaTypeLevels
}