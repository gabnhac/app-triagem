import { create } from "zustand";
import { RiskLegendResultProps } from "./storeTypes";

type State = {
    resultData: RiskLegendResultProps[];
};

type Actions = {
    setResultData: (data: RiskLegendResultProps[]) => void;
};


export const useAppStore = create<State & Actions>((set) => ({
    resultData: [],

    setResultData: (data) => set(() => ({ resultData: data })),

}));