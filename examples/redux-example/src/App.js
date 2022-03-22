import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useNotifier from './useNotifier';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar as closeSnackbarAction,
} from './redux/actions';

const App = () => {
    useNotifier();
    const dispatch = useDispatch();
    const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));
    const [index, setIndex] = React.useState(0);

    const handleClick = () => {
        // NOTE:
        // if you want to be able to dispatch a `closeSnackbar` action later on,
        // you SHOULD pass your own `key` in the options. `key` can be any sequence
        // of numbers or characters, but it has to be unique for a given snackbar.
        const key = new Date().getTime() + Math.random();
        enqueueSnackbar({
            message: `Failed fetching data ${key}.`,
            options: {
                // autoHideDuration: null,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                key,
                variant: 'warning',
                action: () => (
                    <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
                ),
            },
        });
    };

    const handleSequence = () => {
        setIndex((i) => i + 1);
        // NOTE:
        // if you want to be able to dispatch a `closeSnackbar` action later on,
        // you SHOULD pass your own `key` in the options. `key` can be any sequence
        // of numbers or characters, but it has to be unique for a given snackbar.
        enqueueSnackbar({
            message: `Sequence ${index}`,
            options: {
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                key: 'sequence',
                variant: 'warning',
                updateDuplicate: true,
                action: (key) => (
                    <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
                ),
            },
        });
    };

    const handleDismissAll = () => {
        closeSnackbar();
    };

    return (
        <Fragment>
            <Typography variant="h4" gutterBottom>Notistack redux example</Typography>

            <Button variant="outlined" onClick={handleClick}>Display snackbar</Button>
            <Button variant="outlined" onClick={handleSequence}>Display sequential snackbar</Button>
            <Button variant="outlined" onClick={handleDismissAll}>Dismiss all snackbars</Button>
        </Fragment>
    );
};

export default App;
