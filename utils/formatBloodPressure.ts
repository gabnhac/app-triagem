import { BloodPressureType } from "./Risks/cardiovascularDislipidemia/@types";

export function formatBloodPressure(bloodPressure: string, isTreated: boolean): BloodPressureType | string {
    const systolicAndDiastolic = bloodPressure.split('/');

    if (!(systolicAndDiastolic.length === 2)) return 'Formato inválido de pressão arterial'

    return {
        systolic: Number(systolicAndDiastolic[0]),
        diastolic: Number(systolicAndDiastolic[1]),
        isTreated
    }
}