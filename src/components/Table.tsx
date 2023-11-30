import React from 'react';

import TableItem from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useSelector } from '../hooks/redux-hooks';
import { valutesInfoSelector } from '../services/selectors/valute-selectors';
import { FavoriteButton } from './FavoriteButton';


export function Table() {
    const valutes = useSelector(valutesInfoSelector)

    return (
        <TableContainer component={Paper}>
            <TableItem sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Валюта</TableCell>
                        <TableCell align="right">Единиц</TableCell>
                        <TableCell align="right">Буквенный код</TableCell>
                        <TableCell align="right">Курс</TableCell>
                        <TableCell align="right">Избранное</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {valutes.map((valute) => (
                        <TableRow
                            key={valute.NumCode}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                align="left">
                                {valute.Name}
                            </TableCell>
                            <TableCell align="right">{valute.Nominal}</TableCell>
                            <TableCell align="right">{valute.CharCode}</TableCell>
                            <TableCell align="right">{valute.Value}</TableCell>
                            <TableCell align="right">
                                <FavoriteButton valuteCode={valute.CharCode} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableItem>
        </TableContainer>
    );
}