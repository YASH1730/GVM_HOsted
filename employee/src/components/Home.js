import React, {useState} from 'react'
import { Typography, Box, Button } from '@mui/material';
import {Link} from 'react-router-dom'
import '../asset/css/home.css'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';


//Redux ./Form
import {useDispatch,useSelector} from 'react-redux'
import {setForm} from '../Redux/action/action'

export default function Home() {

    const dispatch = useDispatch();

    return (<>
        <title>Home</title>
        <Box className='homeContainer'>
            <AssignmentIndIcon className='image' />
            <Typography variant='h4'>
                Employee Portal
            </Typography>
            <Box className='buttonContainer'>
                <Button size='large' startIcon={<AddIcon />} onClick = {()=>dispatch(setForm({
                        open : true, type  : 'ADD'
                }))} variant='contained'>Add</Button>
                <Button component = {Link} size='large' to= '/list' startIcon={<ViewListIcon />} variant='outlined'>List</Button>
            </Box>
        </Box>
    </>
    )
}
