export const range = (n : number | undefined) => Array.from({ length: n ? n : 0 }, (_, i) => i + 1);