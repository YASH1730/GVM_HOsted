
export const setAlert = (parameter) =>{
    return({
        type : 'ALERT',
        payload : parameter
    })       
}

export const setForm = (parameter) =>{
    return({
        type : 'FORM',
        payload : parameter
    })       
}