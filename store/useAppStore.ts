import { RiskLegendResultProps } from "@/components/RiskLegendResult/index.types";
import { create } from "zustand";

type State = {
    resultData: RiskLegendResultProps[];
};

type Actions = {
    setResultData: (data: RiskLegendResultProps[]) => void;
};


export const useAppStore = create<State & Actions>((set) => ({
    resultData: [] as RiskLegendResultProps[],

    setResultData: (data) => set({ resultData: data }),

}));