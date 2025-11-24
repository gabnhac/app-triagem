import theme from '../../theme';

export type HealthRisk =
    | "cardiovascular"
    | "dislipidemia"
    | "diabetes_tipo2"
    | "obesidade"
    | "hipertensao"
    | "dpoc"
    | "asma"
    | "dor_cronica";

export type CardiovascularDislipidemiaTypeLevels = 'Muito baixo' | 'Baixo' | 'Moderado' | 'Alto' | 'Muito alto';
export type DiabetesLevels = 'Baixo' | 'Levemente elevado' | 'Moderado' | 'Alto' | 'Muito alto';
export type ObesidadeLevels = 'Muito baixo' | 'Leve' | 'Moderado' | 'Alto' | 'Muito alto';
export type HipetensaoLevels = 'Normal' | 'Acima do ideal' | 'Alta' | 'Bem elevada' | 'Muito alta' | 'Situação de emergência';
export type DpocLevels = 'Poucos sintomas, baixo risco' | 'Poucos sintomas, alto risco' | 'Muitos sintomas, baixo risco' | 'Muitos sintomas, alto risco';
export type DorCronicaLevels = 'Leve' | 'Moderada' | 'Forte' | 'Muito forte';

export const cardiovascular_dislipidemia_levels = ['Muito baixo', 'Baixo', 'Moderado', 'Alto', 'Muito alto'];
export const diabetes_levels = ['Baixo', 'Levemente elevado', 'Moderado', 'Alto', 'Muito alto'];
export const obesidade_levels = ['Muito baixo', 'Leve', 'Moderado', 'Alto', 'Muito alto'];
export const hipetensao_levels = ['Normal', 'Acima do ideal', 'Alta', 'Bem elevada', 'Muito alta', 'Situação de emergência'];
export const dpoc_levels = ['Poucos sintomas, baixo risco', 'Poucos sintomas, alto risco', 'Muitos sintomas, baixo risco', 'Muitos sintomas, alto risco'];
export const asma_levels = ['Bem controlada', 'Parcialmente controlada', 'Não controlada'];
export const dor_cronica_levels = ['Leve', 'Moderada', 'Forte', 'Muito forte'];

export const RiskLabelEnum: Record<HealthRisk, string> = {
    dpoc: "DPOC",
    asma: "Asma",
    cardiovascular: "Cardiovascular",
    dislipidemia: "Dislipidemia",
    diabetes_tipo2: "Diabetes tipo 2",
    dor_cronica: "Dor crônica",
    hipertensao: "Hipertensão",
    obesidade: "Obesidade"
}

export const RiskLevelEnum: Record<HealthRisk, string[]> = {
    dpoc: dpoc_levels,
    asma: asma_levels,
    cardiovascular: cardiovascular_dislipidemia_levels,
    dislipidemia: cardiovascular_dislipidemia_levels,
    diabetes_tipo2: diabetes_levels,
    dor_cronica: dor_cronica_levels,
    hipertensao: hipetensao_levels,
    obesidade: obesidade_levels
}

export const RiskColorEnum: Record<HealthRisk, string> = {
    dpoc: theme.colors.risk_dpoc,
    asma: theme.colors.risk_asma,
    cardiovascular: theme.colors.risk_cardiovascular,
    dislipidemia: theme.colors.risk_dislipidemia,
    diabetes_tipo2: theme.colors.risk_diabetes,
    dor_cronica: theme.colors.risk_dor_cronica,
    hipertensao: theme.colors.risk_hipertensao,
    obesidade: theme.colors.risk_obesidade
}

export const LevelColorEnum: Record<HealthRisk, string> = {
    dpoc: theme.colors.risk_dpoc_light,
    asma: theme.colors.risk_asma_light,
    cardiovascular: theme.colors.risk_cardiovascular_light,
    dislipidemia: theme.colors.risk_dislipidemia_light,
    diabetes_tipo2: theme.colors.risk_diabetes_light,
    dor_cronica: theme.colors.risk_dor_cronica_light,
    hipertensao: theme.colors.risk_hipertensao_light,
    obesidade: theme.colors.risk_obesidade_light
}

export type RiskLegendProps = {
    type: HealthRisk,
    isSelected: boolean,
    onSelect: (selected: HealthRisk) => void;
}
