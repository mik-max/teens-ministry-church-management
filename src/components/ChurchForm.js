import  React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel, MenuItem, Input, Select } from '@mui/material';
import styles from './inviteForm.module.css'
import Swal from 'sweetalert2'


const DEVBASEURL = 'https://teens-church-report-api.onrender.com'
export default function ChurchForm({open, setOpen, isAdmin}) {
     let claims = JSON.parse(localStorage.getItem('claims'))
     const [church, setChurch] = useState('');
     const [group, setGroup] = useState('');
     const [churchList, setChurchList] =useState([])
     const [groupList, setGroupList] =useState([])
     const [pastor, setPastor] = useState('');
     const[address, setAddress] = useState('')

     useEffect(() => {
          fetch(`${DEVBASEURL}/api/v1/groups?zone=${claims.zone}&role=${claims.role}`).then((response) =>  {return response.json()}).then((data) => {
               setGroupList(data?.data);
          })
          fetch(`${DEVBASEURL}/api/v1/churches?zone=${claims.zone}&role=${claims.role}&group=${claims.group}&church=${claims.church}`).then((response) =>  {return response.json()}).then((data) => {
               setChurchList(data?.data);
          })
     }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };
     const handleSubmit = (e) => {
          e.preventDefault();
          if(pastor !== '' && church !== '' && address !== ''  && group !== '' ){
               let payload = {
                    pastor: pastor,
                    church: church,
                    group: group,
                    address: address,
               }
     
               fetch(`${DEVBASEURL}/api/v1/churches`, {
                    method: 'POST',
                    headers: {
                         'Accept': 'application/json',
                         'Access-Control-Allow-Origin': '*',
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
               }).then(response => {return response.json()}).then((data) => {
                    if(data.status == 'Ok'){
                         Swal.fire({
                              title: 'Success!',
                              text: data.message,
                              icon: 'success',
                              confirmButtonText: 'Thanks'
                         })
                         handleClose();
                    }else{
                         Swal.fire({
                              title: 'Error!',
                              text: data.message,
                              icon: 'error',
                              confirmButtonText: 'Close'
                         })
                         handleClose();
                    }
                    console.log(data)
               })
          }else{
               Swal.fire({
                    title: "Incomplete 😒",
                    text: "Please ensure to kindly fill all fields adequately",
                    icon: "info",
                  })
                  handleClose();
          }
          
     };

  const handleClose = () => {
    setOpen(false);
  };

return (
     <div>
          <Dialog open={open} onClose={handleClose}>
               <DialogTitle className={styles.title}>Add a new Church</DialogTitle>
               <DialogContent className={styles.content}>
                    <form className={styles.form}>
                   
                    <FormControl>
                         <InputLabel htmlFor="fname">Pastor</InputLabel>
                         <Input id="fname" aria-describedby="my-helper-text" type='text' value={pastor} onChange = {(e) => {setPastor(e.target.value)}} />
                    </FormControl>
                    
                    <FormControl>
                         <InputLabel htmlFor="address">Address</InputLabel>
                         <Input id="address" aria-describedby="my-helper-text" value={address} onChange = {(e) => {setAddress(e.target.value)}} />
                    </FormControl>
                    <FormControl>
                         <InputLabel id="church" >Church</InputLabel>
                         <Input id="church" aria-describedby="my-helper-text" value={church} onChange = {(e) => {setChurch(e.target.value)}} />
                    </FormControl>
                    {claims.role  ===  'Group Admin' ?
                         (<FormControl>
                              <InputLabel htmlFor="group">Group</InputLabel>
                              <Input id="group" aria-describedby="my-helper-text" value={claims.group} readOnly />
                         </FormControl>) : (<FormControl variant='standard'>
                              <InputLabel id="church" className='selectLabel'>Group</InputLabel>
                              <Select labelId="church"id="demo-simple-select"value={group}label="Church"onChange={(e) => {setGroup(e.target.value)}} className={styles.select}>
                                   {groupList.map((group) => (
                                        <MenuItem value={group.Name} key={group.ChurchId}>{group.Name}</MenuItem>
                                   ))}
                                   
                              </Select>
                         </FormControl>)
                    }
                   
                    </form>
                   
                    
               </DialogContent>
               <DialogActions>
                    <Button onClick={handleClose} className={styles.cancelBtn} variant = 'contained'   >Cancel</Button>
                    <Button onClick={handleSubmit} variant = 'outlined'>Add</Button>
               </DialogActions>
          </Dialog>
     </div>
  );
}
