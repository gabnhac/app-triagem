export type OptionType = {
    affirmative: string,
}

export type InputSelectProps = {
    statement: string,
    options: OptionType[],
    onSelect: (option: OptionType) => void,
    isError?: boolean,
}