import React, { ChangeEvent, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import SelectItem, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel, MenuItem, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from '../hooks/redux-hooks';
import { baseInputValueSelector, valuteBaseSelector, valuteCodesSelector, valutesInfoSelector } from '../services/selectors/valute-selectors';
import { BASE_INPUT_VALUE_SET, CONVERT_INPUT_VALUE_SET, VALUTE_BASE_CHANGE, VALUTE_SET } from '../services/constants/valute-info-constants';


export function BaseSelect() {
    const base = useSelector(valuteBaseSelector)
    const baseValue = useSelector(baseInputValueSelector)
    const valutes = useSelector(valutesInfoSelector)
    const dispatch = useDispatch()

    const baseValutes = useSelector(valuteCodesSelector)

    function handleChange(event: SelectChangeEvent<string>) {
        dispatch({
            type: VALUTE_BASE_CHANGE,
            charCode: event.target.value
        })
        dispatch({
            type: CONVERT_INPUT_VALUE_SET,
            inputValue: 0
        })
    }

    function valuteChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        dispatch({
            type: BASE_INPUT_VALUE_SET,
            inputValue: parseInt(event.target.value)
        })
    }

    useEffect(() => {
        dispatch({
            type: VALUTE_SET,
            valutes: valutes
        })
    }, [base])

    return (
        <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={1}
        >
            <FormControl sx={{ m: 1, maxWidth: 150 }}>
                <TextField
                    type="number"
                    id="outlined-basic"
                    label="Введите сумму"
                    variant="outlined"
                    value={baseValue}
                    onChange={valuteChange}
                />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="demo-simple-select-helper-label">Базовая</InputLabel>
                <SelectItem
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={base}
                    label="Базовая"
                    onChange={handleChange}
                >
                    {
                        baseValutes.map((baseValute) => {
                            return <MenuItem
                                key={baseValute}
                                value={baseValute}
                            >
                                {baseValute}
                            </MenuItem>
                        })
                    }
                </SelectItem>
            </FormControl>
        </Stack>
    );
}