import React, { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import SelectItem, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from '../hooks/redux-hooks';
import { valuteBaseSelector, valutesInfoSelector } from '../services/selectors/valute-selectors';
import { VALUTE_BASE_CHANGE, VALUTE_SET } from '../services/constants/valute-info-constants';
import { convert } from '../hooks/use-convert';

const baseValutes = ['RUB', 'USD', 'EUR', 'CNY', 'TRY', 'JPY']

export function Select() {
    const base = useSelector(valuteBaseSelector)
    const valutes = useSelector(valutesInfoSelector);
    const dispatch = useDispatch()

    function handleChange(event: SelectChangeEvent<string>) {
        dispatch({
            type: VALUTE_BASE_CHANGE,
            charCode: event.target.value
        })
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Базовая валюта</InputLabel>
            <SelectItem
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={base}
                label="Базовая валюта"
                onChange={handleChange}
            >
                {
                    baseValutes.map((baseValute) => {
                        return <MenuItem key={baseValute} value={baseValute}>{baseValute}</MenuItem>
                    })
                }
            </SelectItem>
        </FormControl>
    );
}