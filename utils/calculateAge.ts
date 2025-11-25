export function calculateAge(date: Date): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - date.getFullYear();

    const mesAtual = hoje.getMonth();
    const mesNascimento = date.getMonth();

    if (
        mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && hoje.getDate() < date.getDate())
    ) {
        idade--;
    }

    return idade;
}