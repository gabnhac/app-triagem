import { DiabetesLevels } from "@/components/RiskLegend/types";


export type RiskResultTypeDiabetesTipo2 = {
    classification: DiabetesLevels,
    score: number,
    probability: string,
    tip: string,
}

export const diabetesRanges = {
    idade: [
        { min: 20, max: 34, score: 0 },
        { min: 35, max: 39, score: 0 },
        { min: 40, max: 44, score: 0 },
        { min: 45, max: 49, score: 2 },
        { min: 50, max: 54, score: 2 },
        { min: 55, max: 59, score: 3 },
        { min: 60, max: 64, score: 3 },
        { min: 65, max: 69, score: 4 },
        { min: 70, max: 74, score: 4 },
        { min: 75, max: Infinity, score: 4 },
    ],

    imc: [
        { min: 0, max: 24.9, score: 0 },
        { min: 25, max: 30, score: 1 },
        { min: 30.01, max: Infinity, score: 3 },
    ],

    cintura_man: [
        { min: 0, max: 93.9, score: 0 },
        { min: 94, max: 102, score: 3 },
        { min: 102.01, max: Infinity, score: 4 },
    ],

    cintura_woman: [
        { min: 0, max: 79.9, score: 0 },
        { min: 80, max: 88, score: 3 },
        { min: 88.01, max: Infinity, score: 4 },
    ],
};

export const diabetesRiskLevels = [
    {
        classification: "Baixo",
        min: 0,
        max: 6,
        probability: "Cerca de 1 em cada 100 pessoas irá desenvolver a doença",
        tip: "Orientações gerais de estilo de vida",
    },
    {
        classification: "Levemente elevado",
        min: 7,
        max: 11,
        probability: "Cerca de 1 em cada 25 pessoas irá desenvolver a doença",
        tip: "Incentivar avaliações periódicas",
    },
    {
        classification: "Moderado",
        min: 12,
        max: 14,
        probability: "Cerca de 1 em cada 6 pessoas irá desenvolver a doença",
        tip: "Sugerir exame de glicemia e acompanhamento",
    },
    {
        classification: "Alto",
        min: 15,
        max: 20,
        probability: "Cerca de 1 em cada 3 pessoas irá desenvolver a doença",
        tip: "Recomendação de avaliação médica e laboratorial urgente",
    },
    {
        classification: "Muito alto",
        min: 21,
        max: Infinity,
        probability: "Cerca de 1 em cada 2 pessoas irá desenvolver a doença",
        tip: "Encaminhamento prioritário para avaliação clínica",
    },
];