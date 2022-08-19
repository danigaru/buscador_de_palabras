import React from 'react';
import { Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ResponseElement(props) {
    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={props.handClose}>
            Cerrar
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={props.handClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={props.open}
            autoHideDuration={6000}
            onClose={props.handClose}
            message={props.content}
            action={action}
        />
    );
}

