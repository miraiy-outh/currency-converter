import React, { useEffect } from 'react';
import { BaseSelect } from './components/BaseSelect';
import { Table } from './components/Table';
import { CircularProgress, Alert, Stack } from '@mui/material';
import { getCurrentCourse } from './services/cbr-daily';
import { useDispatch, useSelector } from './hooks/redux-hooks';
import { IS_ERROR_SET, IS_LOADING_SET, VALUTE_CODES_SET, VALUTE_SET } from './services/constants/valute-info-constants';
import { isErrorSelector, isLoadingSelector, isValuteCodesLoadedSelector } from './services/selectors/valute-selectors';
import { ConvertSelect } from './components/ConvertSelect';

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(isLoadingSelector)
  const isError = useSelector(isErrorSelector)
  const isValuteCodesLoaded = useSelector(isValuteCodesLoadedSelector)
  useEffect(() => {
    setInterval(() => {
      dispatch({ type: IS_LOADING_SET, isLoading: true })
      getCurrentCourse()
        .then((data) => {
          dispatch({ type: VALUTE_SET, valutes: data })
          if (!isValuteCodesLoaded) {
            const valuteCodes = data.map((item) => item.CharCode)
            dispatch({ type: VALUTE_CODES_SET, valuteCodes: valuteCodes })
          }


          dispatch({ type: IS_LOADING_SET, isLoading: false })
          dispatch({ type: IS_ERROR_SET, isError: false })
        })
        .catch(() => {
          dispatch({ type: IS_ERROR_SET, isError: true })
        })
    }, 5000)
  }, [])
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}>
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={2}
        >
          <BaseSelect />
          {isLoading ? <CircularProgress /> : null}
        </Stack>
        <ConvertSelect />
      </Stack>
      {isError ? <Alert severity="error">Ошибка загрузки данных</Alert> : <Table />}
    </>
  );
}

export default App;
