export function calculateValueAndNominal(value: number, nominal: number) {
    while (value < 1) {
        value = value * 10
        nominal = nominal * 10
    }
    value = rounding(value, 4)
    return { value, nominal }
}

export function calculateConvertValue(value: number, nominal: number, baseValue: number) {
    return rounding(baseValue / (value / nominal), 4)
}

function rounding(value: number, digits: number) {
    return Math.round(value * (10 ** digits)) / (10 ** digits)
}