import React, { ChangeEvent } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField, MenuItem, FormControl, Stack, InputLabel, Button } from '@mui/material';
import { useDispatch, useSelector } from '../hooks/redux-hooks';
import { convertInputValueSelector, isValuteCodesLoadedSelector, valuteBaseSelector, valuteCodesSelector, valuteConvertSelector, valutesInfoSelector } from '../services/selectors/valute-selectors';
import { CONVERT_COUNT, CONVERT_INPUT_VALUE_SET, VALUTE_CONVERT_CHANGE } from '../services/constants/valute-info-constants';

export function ConvertSelect() {
    const base = useSelector(valuteBaseSelector)
    const convert = useSelector(valuteConvertSelector)
    const convertValue = useSelector(convertInputValueSelector)
    const isValuteCodesLoaded = useSelector(isValuteCodesLoadedSelector)
    const dispatch = useDispatch()

    const baseValutes = useSelector(valuteCodesSelector)

    function handleChange(event: SelectChangeEvent<string>) {
        dispatch({
            type: VALUTE_CONVERT_CHANGE,
            charCode: event.target.value
        })
        dispatch({
            type: CONVERT_INPUT_VALUE_SET,
            inputValue: 0
        })
    }

    function countConvertValue() {
        dispatch({ type: CONVERT_COUNT })
    }

    return (
        <Stack
            direction="row"
            justifyContent="end"
            alignItems="center"
            spacing={1}
        >
            <FormControl sx={{ m: 1, maxWidth: 150 }}>
                <TextField
                    type="number"
                    id="outlined-basic"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    value={convertValue}
                />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={convert}
                    onChange={handleChange}
                >
                    {
                        baseValutes.filter((baseValute) => baseValute !== base).map((baseValute) => {
                            return <MenuItem key={baseValute} value={baseValute}>{baseValute}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <Button
                variant="contained"
                size="large"
                onClick={countConvertValue}
                disabled={!isValuteCodesLoaded}
            >
                Посчитать
            </Button>
        </Stack>
    );
}