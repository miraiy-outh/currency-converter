import React, { useEffect } from 'react';
import { Select } from './components/Select';
import { Table } from './components/Table';
import { CircularProgress, Alert, TextField, FormControl, InputLabel } from '@mui/material';
import { getCurrentCourse } from './services/cbr-daily';
import { useDispatch, useSelector } from './hooks/redux-hooks';
import { IS_ERROR_SET, IS_LOADING_SET, VALUTE_SET } from './services/constants/valute-info-constants';
import { AppHeader } from './App.styled';
import { isErrorSelector, isLoadingSelector, valuteBaseSelector } from './services/selectors/valute-selectors';
import { convert } from './hooks/use-convert';

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(isLoadingSelector)
  const isError = useSelector(isErrorSelector)
  const base = useSelector(valuteBaseSelector)
  useEffect(() => {
    setInterval(() => {
      dispatch({ type: IS_LOADING_SET, isLoading: true })
      getCurrentCourse()
        .then((data) => {
          // console.log(base)
          dispatch({ type: VALUTE_SET, base: base, valutes: data })
          dispatch({ type: IS_LOADING_SET, isLoading: false })
          dispatch({ type: IS_ERROR_SET, isError: false })
        })
        .catch(() => {
          dispatch({ type: IS_ERROR_SET, isError: true })
        })
    }, 5000)
  }, [base])
  return (
    <div>
      <AppHeader>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <TextField type="number" id="outlined-basic" label="Введите сумму" variant="outlined" />
        </FormControl>
        <Select />
        {isLoading ? <CircularProgress /> : null}
      </AppHeader>
      {isError ? <Alert severity="error">Ошибка загрузки данных</Alert> : <Table />}
    </div>
  );
}

export default App;
