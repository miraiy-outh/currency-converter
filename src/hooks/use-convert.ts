import { TValuteInfo } from "../services/cbr-daily";
import { valuteBaseSelector, valutesInfoSelector } from "../services/selectors/valute-selectors";
import { useSelector } from "./redux-hooks";

export function convert(valutes: TValuteInfo[], baseValuteCode: string) {
    const baseValuteInfo = valutes.find(valute => valute.CharCode === baseValuteCode);
    console.log(baseValuteCode, baseValuteInfo, valutes)
    if (!baseValuteInfo) return valutes
    const { Value } = baseValuteInfo
    const newValutes = valutes.map((valute) => {
        return {
            ...valute,
            Value: Math.round((valute.Value / Value) * 10000) / 10000
        }
    })
    console.log(newValutes)
    return newValutes
}