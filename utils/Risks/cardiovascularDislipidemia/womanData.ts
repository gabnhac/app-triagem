export const femaleRanges = {
    idade: [
        { min: 20, max: 34, score: -7 },
        { min: 35, max: 39, score: -3 },
        { min: 40, max: 44, score: 0 },
        { min: 45, max: 49, score: 3 },
        { min: 50, max: 54, score: 6 },
        { min: 55, max: 59, score: 8 },
        { min: 60, max: 64, score: 10 },
        { min: 65, max: 69, score: 12 },
        { min: 70, max: 74, score: 14 },
        { min: 75, max: Infinity, score: 16 },
    ],

    dislipidemia_idade: [
        { min: 20, max: 34, score: 0 },
        { min: 35, max: 39, score: 2 },
        { min: 40, max: 44, score: 4 },
        { min: 45, max: 49, score: 5 },
        { min: 50, max: 54, score: 7 },
        { min: 55, max: 59, score: 8 },
        { min: 60, max: 64, score: 9 },
        { min: 65, max: 69, score: 10 },
        { min: 70, max: 74, score: 11 },
        { min: 75, max: Infinity, score: 12 },
    ],

    colesterolTotal: [
        { min: 0, max: 159, score: 0 },
        { min: 160, max: 199, score: 1 },
        { min: 200, max: 239, score: 3 },
        { min: 240, max: 279, score: 4 },
        { min: 280, max: Infinity, score: 5 },
    ],

    hdl: [
        { min: 60, max: Infinity, score: -1 },
        { min: 50, max: 59, score: 0 },
        { min: 45, max: 49, score: 1 },
        { min: 40, max: 44, score: 1 },
        { min: 35, max: 39, score: 2 },
        { min: 0, max: 34, score: 2 },
    ],

    dislipidemia_hdl: [
        { min: 60, max: Infinity, score: -2 },
        { min: 50, max: 59, score: -1 },
        { min: 45, max: 49, score: 0 },
        { min: 40, max: 44, score: 1 },
        { min: 35, max: 39, score: 1 },
        { min: 0, max: 34, score: 2 },
    ],

    pas_nao_tratada: [
        { min: 0, max: 119, score: 0 },
        { min: 120, max: 129, score: 1 },
        { min: 130, max: 139, score: 2 },
        { min: 140, max: 159, score: 3 },
        { min: 160, max: Infinity, score: 4 },
    ],

    pas_tratada: [
        { min: 0, max: 119, score: 1 },
        { min: 120, max: 129, score: 2 },
        { min: 130, max: 139, score: 3 },
        { min: 140, max: 159, score: 4 },
        { min: 160, max: Infinity, score: 5 },
    ],

    dislipidemia_pas_nao_tratada: [
        { min: 0, max: 119, score: -3 },
        { min: 120, max: 129, score: 0 },
        { min: 130, max: 139, score: 1 },
        { min: 140, max: 159, score: 3 },
        { min: 160, max: Infinity, score: 5 },
    ],

    dislipidemia_pas_tratada: [
        { min: 0, max: 119, score: -1 },
        { min: 120, max: 129, score: 2 },
        { min: 130, max: 139, score: 3 },
        { min: 140, max: 159, score: 5 },
        { min: 160, max: Infinity, score: 7 },
    ],

    tabagismo: {
        sim: 3,
        nao: 0,
    },

    diabetes: {
        sim: 4,
        nao: 0,
    },

    imc: [
        { min: 0, max: 24.9, score: 0 },
        { min: 25, max: 29.9, score: 1 },
        { min: 30, max: 34.9, score: 3 },
        { min: 35, max: 39.9, score: 4 },
        { min: 40, max: Infinity, score: 5 },
    ],
}

export const femaleCardiovascularRisk = [
    {
        min: -Infinity,
        max: 8,
        risk: "<1%",
        classification: "Muito Baixo",
    },
    {
        min: 9,
        max: 12,
        risk: "1–5%",
        classification: "Baixo",
    },
    {
        min: 13,
        max: 15,
        risk: "6–10%",
        classification: "Moderado",
    },
    {
        min: 16,
        max: 19,
        risk: "11–20%",
        classification: "Alto",
    },
    {
        min: 20,
        max: Infinity,
        risk: ">20%",
        classification: "Muito alto",
    },
]

export const femaleDislipidemiaRisk = [
    {
        min: -Infinity,
        max: 8,
        risk: "<1%",
        classification: "Muito Baixo",
    },
    {
        min: 9,
        max: 17,
        risk: "1–5%",
        classification: "Baixo",
    },
    {
        min: 18,
        max: 20,
        risk: "6–11%",
        classification: "Moderado",
    },
    {
        min: 21,
        max: 23,
        risk: "14–22%",
        classification: "Alto",
    },
    {
        min: 24,
        max: Infinity,
        risk: "27–>30%",
        classification: "Muito alto",
    },
]