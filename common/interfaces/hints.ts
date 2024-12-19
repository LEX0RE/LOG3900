export interface Hints {
    hints: HintToSend[];
}

export interface HintToSend {
    command: string;
    wordPlacement: string;
}
