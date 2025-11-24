export function calculateIMC(height: number, weight: number) {
    const heightInM = height / 100;
    return weight / (heightInM * heightInM);
}