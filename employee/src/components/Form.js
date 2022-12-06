import React, { useState, useEffect } from 'react';
import {
    Backdrop,
    Box,
    Modal,
    Fade,
    Button,
    Typography,
    TextField,
    MenuItem,
    FormControlLabel,
    FormGroup,
    Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';

import '../asset/css/add.css'

// redux 
import { useDispatch, useSelector } from 'react-redux'
import { setAlert, setForm } from '../Redux/action/action'

// apis
import { addEmployee, listDepartment, updateEmployee } from '../service/service'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

export default function Form() {

    const dispatch = useDispatch();
    const { form } = useSelector(state => state);

    const [data, setData] = useState({})
    const [error, setError] = useState(false)
    const [dept, setDept] = useState([])

    useEffect(()=>{
        listDepartment()
        .then((res)=>setDept(res.data))

        if(form.type  === 'UPDATE')
        {
            setData({
                _id : form.payload.action._id, 
                firstName : form.payload.firstName, 
                lastName : form.payload.lastName, 
                email : form.payload.email, 
                department : form.payload.department, 
            })
        }
    },[form])

    const handleAddEmp = async (e) => {
        e.preventDefault();
        const FD = new FormData();
        FD.append('firstName', data.firstName);
        FD.append('lastName', data.lastName);
        FD.append('email', data.email);
        FD.append('department', data.department);
        FD.append('newDept', data.newDept);

        const res = await addEmployee(FD)

        if (res.status === 200 && res.data.response) {

            dispatch(setAlert({
                open: true,
                type: 'success',
                message: res.data.message
            }))
            dispatch(setForm({
                open: false,
                type: null
            }))

            setData({})
        }
        else {
            return dispatch(setAlert({
                open: true,
                type: 'error',
                message: res.data.message
            }))
        }

    }
    const handleUpdateEmp = async (e) => {
        e.preventDefault();
        const FD = new FormData();
        FD.append('firstName', data.firstName);
        FD.append('lastName', data.lastName);
        FD.append('email', data.email);
        FD.append('department', data.department);
        FD.append('_id', data._id);

        const res = await updateEmployee(FD)

        if (res.status === 200 && res.data.response) {

            dispatch(setAlert({
                open: true,
                type: 'success',
                message: res.data.message
            }))
            dispatch(setForm({
                open: false,
                type: null
            }))

            setData({})
        }
        else {
            return dispatch(setAlert({
                open: true,
                type: 'error',
                message: res.data.message
            }))
        }

    }

    const handleValues = (e) => {
        if (e.target.name === 'email') {
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regEmail.test(e.target.value)) {
                setData(old => ({ ...old, [e.target.name]: e.target.value }))
                return setError(true)
            }
            setError(false)
            setData(old => ({ ...old, [e.target.name]: e.target.value }))
        }

        else if (e.target.name === 'newDept') {
            setData(old => ({ ...old, [e.target.name]: e.target.checked }))
        }

        else setData(old => ({ ...old, [e.target.name]: e.target.value }))
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={form.open}
                onClose={() => {
                    setData({});
                    dispatch(setForm({ open: false, type: null }))
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={form.open}>
                    <Box sx={style}>
                        {/* add */}
                        {
                            form.type === 'ADD' && <form method='post' encType='multipart/form-data' onSubmit={handleAddEmp} className='form'>
                                <Typography variant='h5'>Add Employee</Typography>
                                <TextField value={data.firstName || ''} onChange={handleValues} required fullWidth size='small' label='First Name' name='firstName' type='text' />
                                <TextField value={data.lastName || ''} onChange={handleValues} required fullWidth size='small' label='Last Name' name='lastName' type='text' />
                                <TextField error={error} value={data.email || ''} onChange={handleValues} required fullWidth type='email' size='small' label='Email' name='email' placeholder='example@gmal.com' />

                                {data.newDept ? <TextField value={data.department || ''} onChange={handleValues} required fullWidth size='small' label='Department' name='department' type='text' />
                                    : <TextField
                                        fullWidth
                                        required
                                        onChange={handleValues}
                                        id="demo-simple-select"
                                        name='department'
                                        size='small'
                                        select
                                        value={data.department || ''}
                                        label="Department"
                                    >
                                        {dept.map((option)=><MenuItem key = {option._id}
                                        value={option.name}>
                                            {option.name}
                                            </MenuItem>
                                        )}
                                    </TextField>
                                }
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox sx={{ pl: 2 }} name='newDept' onChange={handleValues} size='small' checked={data.newDept || false} />} label={<Typography variant='caption'>Add New Department</Typography>} />
                                </FormGroup>
                                <Button size='large' startIcon={<AddIcon />} type='submit' variant='contained'>Add</Button>
                            </form>
                        }
                        {/* update  */}
                        {
                            form.type === 'UPDATE' && <form method='post' encType='multipart/form-data' onSubmit={handleUpdateEmp} className='form'>
                            <Typography variant='h5'>Update Employee</Typography>
                            <TextField value={data.firstName || ''} onChange={handleValues} required fullWidth size='small' label='First Name' name='firstName' type='text' />
                            <TextField value={data.lastName || ''} onChange={handleValues} required fullWidth size='small' label='Last Name' name='lastName' type='text' />
                            <TextField error={error} value={data.email || ''} onChange={handleValues} required fullWidth type='email' size='small' label='Email' name='email' placeholder='example@gmal.com' />

                            {data.newDept ? <TextField value={data.department || ''} onChange={handleValues} required fullWidth size='small' label='Department' name='department' type='text' />
                                : <TextField
                                    fullWidth
                                    required
                                    onChange={handleValues}
                                    id="demo-simple-select"
                                    name='department'
                                    size='small'
                                    select
                                    value={data.department || ''}
                                    label="Department"
                                >
                                    {dept.map((option)=><MenuItem key = {option._id}
                                    value={option.name}>
                                        {option.name}
                                        </MenuItem>
                                    )}
                                </TextField>
                            }
                            <Button size='large' color = 'secondary' startIcon={<CreateIcon />} type='submit' variant='contained'>Update</Button>
                        </form>
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}