const initialState = {
    open : false,
    type : null,
    message : null
}

export const alert = (state = initialState ,action)=>{ 
        switch (action.type) {
            case 'ALERT':
                return state = action.payload
            default:
                return state
        }
}
const formState = {
    open : false,
    type : null,
    payload : null
}

export const form = (state = formState ,action)=>{ 
        switch (action.type) {
            case 'FORM':
                return state = action.payload
            default:
                return state
        }
}