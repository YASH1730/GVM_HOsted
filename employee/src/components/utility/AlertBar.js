import * as React from 'react';
import {Snackbar,Alert} from '@mui/material';

// redux 
import {useDispatch,useSelector} from 'react-redux'
import {setAlert} from '../../Redux/action/action'


const AlertBox = React.forwardRef(function AlertBox(props, ref) {
            return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
          });
        

export default function AlertBar() {

    const {alert} = useSelector(state=>state)
    const dispatch = useDispatch();

   
      return (
        <>
        {console.log(alert)}
          {alert.open === true &&
            <Snackbar className='snackbar' open={alert.open} autoHideDuration={6000} onClose={() => dispatch(setAlert({ open: false, type: null, massage: null }))}>
              <AlertBox className = 'alert' onClose={() => dispatch(setAlert({ open: false, type: null, massage: null }))} severity={alert.type} sx={{ width: '100%'  }}>
                {alert.message}
              </AlertBox>
            </Snackbar>
          }
        </>
      )
}
