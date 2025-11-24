export type OptionType = {
    affirmative: string,
}

export type InputSelectProps = {
    statement: string,
    options: OptionType[],
    onSelect: (prevOption: OptionType | null, option: OptionType) => void,
    isError?: boolean,
}