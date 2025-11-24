export const maleRanges = {
    idade: [
        { min: 20, max: 34, score: -9 },
        { min: 35, max: 39, score: -4 },
        { min: 40, max: 44, score: 0 },
        { min: 45, max: 49, score: 3 },
        { min: 50, max: 54, score: 6 },
        { min: 55, max: 59, score: 8 },
        { min: 60, max: 64, score: 10 },
        { min: 65, max: 69, score: 11 },
        { min: 70, max: 74, score: 12 },
        { min: 75, max: Infinity, score: 13 },
    ],

    dislipidemia_idade: [
        { min: 20, max: 34, score: 0 },
        { min: 35, max: 39, score: 2 },
        { min: 40, max: 44, score: 5 },
        { min: 45, max: 49, score: 6 },
        { min: 50, max: 54, score: 8 },
        { min: 55, max: 59, score: 10 },
        { min: 60, max: 64, score: 11 },
        { min: 65, max: 69, score: 12 },
        { min: 70, max: 74, score: 14 },
        { min: 75, max: Infinity, score: 15 },
    ],

    colesterolTotal: [
        { min: 0, max: 159, score: 0 },
        { min: 160, max: 199, score: 1 },
        { min: 200, max: 239, score: 2 },
        { min: 240, max: 279, score: 3 },
        { min: 280, max: Infinity, score: 4 },
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
        { min: 120, max: 129, score: 0 },
        { min: 130, max: 139, score: 1 },
        { min: 140, max: 159, score: 2 },
        { min: 160, max: Infinity, score: 3 },
    ],

    pas_tratada: [
        { min: 0, max: 119, score: 0 },
        { min: 120, max: 129, score: 1 },
        { min: 130, max: 139, score: 2 },
        { min: 140, max: 159, score: 3 },
        { min: 160, max: Infinity, score: 4 },
    ],

    dislipidemia_pas_nao_tratada: [
        { min: 0, max: 119, score: -2 },
        { min: 120, max: 129, score: 0 },
        { min: 130, max: 139, score: 1 },
        { min: 140, max: 159, score: 2 },
        { min: 160, max: Infinity, score: 3 },
    ],

    dislipidemia_pas_tratada: [
        { min: 0, max: 119, score: 0 },
        { min: 120, max: 129, score: 2 },
        { min: 130, max: 139, score: 3 },
        { min: 140, max: 159, score: 4 },
        { min: 160, max: Infinity, score: 5 },
    ],

    tabagismo: {
        sim: 4,
        nao: 0,
    },

    diabetes: {
        sim: 3,
        nao: 0,
    },

    imc: [
        { min: 0, max: 24.9, score: 0 },
        { min: 25, max: 29.9, score: 1 },
        { min: 30, max: 34.9, score: 2 },
        { min: 35, max: 39.9, score: 3 },
        { min: 40, max: Infinity, score: 4 },
    ],
}

export const maleCardiovascularRisk = [
    {
        min: -Infinity,
        max: -1,
        risk: "<1%",
        classification: "Muito Baixo",
    },
    {
        min: 0,
        max: 6,
        risk: "1–3%",
        classification: "Baixo",
    },
    {
        min: 7,
        max: 10,
        risk: "4–8%",
        classification: "Moderado",
    },
    {
        min: 11,
        max: 11,
        risk: "11%",
        classification: "Alto",
    },
    {
        min: 12,
        max: Infinity,
        risk: ">13%",
        classification: "Muito alto",
    },
]

export const maleDislipidemiaRisk = [
    {
        min: -Infinity,
        max: -1,
        risk: "<1%",
        classification: "Muito Baixo",
    },
    {
        min: 0,
        max: 7,
        risk: "1–3%",
        classification: "Baixo",
    },
    {
        min: 8,
        max: 12,
        risk: "4–10%",
        classification: "Moderado",
    },
    {
        min: 13,
        max: 15,
        risk: "12–20%",
        classification: "Alto",
    },
    {
        min: 16,
        max: Infinity,
        risk: "25–>30%",
        classification: "Muito alto",
    },
]