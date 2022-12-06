import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Grid,
    Button,
    IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BallotIcon from '@mui/icons-material/Ballot';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import {
    listEmployee,
    deleteEmployee
} from '../service/service'

import {
    DataGrid
} from '@mui/x-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import { setForm, setAlert } from '../Redux/action/action'

import '../asset/css/list.css'

export default function List(props) {

    // store
    const dispatch = useDispatch();
    const {alert} = useSelector(state=>state);


    // page state to controlling the pagination on server side
    const [pageState, setPageState] = useState({
        data: [],
        isLoading: false,
        page: 1,
        pageSize: 50,
        total: 0
    })

    useEffect(() => {

        const fetchData = async () => {
            setPageState(lastState => ({
                ...lastState,
                isLoading: true
            }))
            listEmployee({ page: pageState.page, limit: pageState.pageSize })
                .then((data) => {
                    setPageState(lastState => ({
                        ...lastState,
                        data: data.data.data.map((row, index) => {
                            return {
                                id: index + 1,
                                firstName: row.firstName,
                                lastName: row.lastName,
                                email: row.email,
                                department: row.department,
                                action: row
                            }
                        }),
                        isLoading: false,
                        total: data.data.total
                    }))
                })
                .catch((err) => {
                })
        }

        fetchData();

    }, [pageState.page, pageState.pageSize,alert])



    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "firstName", headerName: "First Name", width: 150 },
        { field: "lastName", headerName: "Last Name", width: 150 },
        { field: "email", headerName: "Email", width: 300 },
        { field: "department", headerName: "Department", width: 200 },
        {   field: "action",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => <>
                    <IconButton onClick={() => {
                        console.log(params)
                        dispatch(setForm({
                            open : true,
                            type : 'UPDATE',
                            payload : params.row
                        }))
                    }} aria-label="update"  >
                        <CreateIcon />
                    </IconButton>

                    <IconButton onClick={() => {
                        deleteEmployee(params.row.email)
                        .then((res)=>{
                            dispatch(setAlert({
                                open :true,
                                type : 'warning',
                                message : 'Employee has been deleted !!!'
                            }))
                            setPageState((old)=>({...old,
                         data : pageState.data.filter((row)=>{return row.email !== params.row.email})
                         }))
                        })
                        .catch((err)=>{
                            dispatch(setAlert({
                                open :true,
                                type : 'error',
                                message : 'Some error occurs !!!'
                            }))
                        })
                    }}>
                    <DeleteIcon/>
                    </IconButton>
                </>
            }

    ];




function DataGridView() {
    return (
        <div style={{ marginTop: '2%', height: 400, width: "100%" }}>
            <title>List</title>
            <DataGrid
                rows={pageState.data}
                rowCount={pageState.total}
                loading={pageState.isLoading}
                rowsPerPageOptions={[10, 30, 50, 70, 100]}
                pagination
                page={pageState.page - 1}
                pageSize={pageState.pageSize}
                paginationMode="server"
                onPageChange={(newPage) => {
                    setPageState(old => ({ ...old, page: newPage + 1 }))
                }}
                onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                columns={columns}
            />
        </div>

    );
}

return (
    <>
        <Box container scaping={2} className="listContainer">
            <Box item xs={12}>
                <BallotIcon sx={{ fontSize: '150px' }} />
            </Box>
            <Box item >
                <Typography component={'span'} sx={{ display: "block" }} variant="h4">
                    List Employee
                </Typography>
            </Box>
            <Box item p={2} xs={12} md={12} sx={{ boxShadow: 2, borderRadius: 5, width: '100%' }}>
                {DataGridView()}
            </Box>
        </Box>
    </>
);
}
