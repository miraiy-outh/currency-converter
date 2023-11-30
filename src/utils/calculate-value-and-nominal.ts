export function calculateValueAndNominal(value: number, nominal: number) {
    while (value < 1) {
        value = value * 10
        nominal = nominal * 10
    }
    value = Math.round(value * 10000) / 10000
    return { value, nominal }
}