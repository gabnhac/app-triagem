import { DpocLevels } from "@/components/RiskLegend/types"

export type DpocProps = {
    cat: number,
    grauDispneia: number,
    crisesDPOC: number
}

export type RiskResultTypeDPOC = {
    score: number,
    category: DpocLevels
}