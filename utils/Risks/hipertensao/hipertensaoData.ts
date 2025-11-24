import { HipetensaoLevels } from "@/components/RiskLegend/types";

export type RiskResultTypeHipertensao = {
    classification: HipetensaoLevels,
    tip: string,
}

export const bloodPressureRanges = [
    {
        classification: "Normal",
        pas: { min: 0, max: 119 },
        pad: { min: 0, max: 79 },
        tip: "Mantenha hábitos saudáveis e repita a medição uma vez por ano."
    },
    {
        classification: "Acima do ideal",
        pas: { min: 120, max: 139 },
        pad: { min: 80, max: 89 },
        tip: "Repita as medições em dias diferentes e procure um posto de saúde se continuar alta."
    },
    {
        classification: "Alta",
        pas: { min: 140, max: 159 },
        pad: { min: 90, max: 99 },
        tip: "Pode ser hipertensão leve; faça novas medições e considere avaliação médica."
    },
    {
        classification: "Bem elevada",
        pas: { min: 160, max: 179 },
        pad: { min: 100, max: 109 },
        tip: "Procure unidade de saúde para avaliar hipertensão contínua."
    },
    {
        classification: "Muito alta",
        pas: { min: 180, max: Infinity },
        pad: { min: 110, max: Infinity },
        tip: "Procure atendimento médico para avaliação e possível tratamento."
    },
    {
        classification: "Situação de emergência",
        pas: { min: 180, max: Infinity },
        pad: { min: 120, max: Infinity },
        tip: "Vá imediatamente a um pronto atendimento; pode ser risco grave à saúde."
    }
];