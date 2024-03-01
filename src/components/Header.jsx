import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

const Header = () =>{
    return(
        <AppBar>
            <Toolbar>
                <IconButton>
                    <ImportContactsIcon className='text-white'/>
                </IconButton>
                <Typography component='h1' className='w-screen'>Address Book</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;