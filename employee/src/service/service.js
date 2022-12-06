import axios from 'axios';

// const URL = 'http://localhost:8000/api'
const URL = 'https://jolly-overshirt-bull.cyclic.app/api'

export const addEmployee = async (data) => {return await axios.post(`${URL}/addEmployee`,data)};

export const updateEmployee = async (data) => {return await axios.patch(`${URL}/updateEmployee`,data)};

export const listDepartment = async () => {return await axios.get(`${URL}/listDepartment`)};

export const listEmployee = async (data) => {return await axios.get(`${URL}/listEmployee?page=${data.page}&limit=${data.limit}`)};

export const deleteEmployee = async (data) => {return await axios.delete(`${URL}/deleteEmployee?email=${data}`)};