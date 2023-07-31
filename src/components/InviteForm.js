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
export default function InviteForm({open, setOpen, isAdmin}) {
     let claims = JSON.parse(localStorage.getItem('claims'))
     const [church, setChurch] = useState(claims.church);
     const [data, setData] =useState([])
     const [gender, setGender] = useState('');
     const [role, setRole] = useState('');
     const [foundationSchool, setFoundationSchool] = useState(0)
     const[firstName, setFirstName] = useState('')
     const[lastName, setLastName] = useState('')
     const[email, setEmail] = useState('')
     const[phoneNumber, setPhoneNumber] = useState('')
     const[address, setAddress] = useState('')

     useEffect(() => {
          fetch(`${DEVBASEURL}/api/v1/churches?zone=${claims.zone}&role=${claims.role}&group=${claims.group}&church=${claims.church}`).then((response) =>  {return response.json()}).then((data) => {
               console.log(data)
              setData(data?.data);
          })
     }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };
     const handleSubmit = (e) => {
          e.preventDefault();
          if(firstName !== '' && lastName !== '' && email !== ''  && church !== '' && gender !== '' && address !== '' && phoneNumber !== ''){
               let payload = {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    address: address,
                    email: email,
                    gender: gender,
                    church: church,
                    role: claims.role == 'Church Admin' || claims.role == 'Group Admin'? 'Member' : role ,
                    foundationSchool: foundationSchool
               }
     
               fetch(`${DEVBASEURL}/api/v1/users`, {
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
               <DialogTitle className={styles.title}>Add a new Member</DialogTitle>
               <DialogContent className={styles.content}>
                    <form className={styles.form}>
                    <FormControl>
                         <InputLabel htmlFor="fname">First Name</InputLabel>
                         <Input id="fname" aria-describedby="my-helper-text" type='text' value={firstName} onChange = {(e) => {setFirstName(e.target.value)}} />
                    </FormControl>
                    <FormControl>
                         <InputLabel htmlFor="lname">Last Name</InputLabel>
                         <Input id="lname" aria-describedby="my-helper-text" value={lastName} onChange = {(e) => {setLastName(e.target.value)}} />
                    </FormControl>
                    <FormControl>
                         <InputLabel htmlFor="address">Address</InputLabel>
                         <Input id="address" aria-describedby="my-helper-text" value={address} onChange = {(e) => {setAddress(e.target.value)}} />
                    </FormControl>
                    <FormControl>
                         <InputLabel htmlFor="eAddress">Email address</InputLabel>
                         <Input  id="eAddress" aria-describedby="my-helper-text" value = {email} onChange = {(e) => {setEmail(e.target.value)}} />
                    </FormControl>
                    <FormControl>
                         <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                         <Input id="phoneNumber"  aria-describedby="my-helper-text" value={phoneNumber} onChange = {(e) => {setPhoneNumber(e.target.value)}} />
                    </FormControl>
                    {claims.role === "Church Admin" || claims.role ===  'Group Admin' ?
                         (<FormControl>
                              <InputLabel htmlFor="phoneNumber"></InputLabel>
                              <Input id="phoneNumber" aria-describedby="my-helper-text" value={claims.church} readOnly />
                         </FormControl>) : (<FormControl variant='standard'>
                              <InputLabel id="church" className='selectLabel'>Church</InputLabel>
                              <Select labelId="church"id="demo-simple-select"value={church}label="Church"onChange={(e) => {setChurch(e.target.value)}} className={styles.select}>
                                   {data?.map((church) => (
                                        <MenuItem value={church.Name} key={church.ChurchId}>{church.Name}</MenuItem>
                                   ))}
                                   
                              </Select>
                         </FormControl>)
                    }
                    <FormControl variant='standard' >
                         <InputLabel id="gender" className='selectLabel'>Gender</InputLabel>
                         <Select labelId="gender"id="genderSelect"value={gender}label="Church"onChange={(e) => {setGender(e.target.value)}} className={styles.select}>
                              <MenuItem value={'Male'}>Male</MenuItem>
                              <MenuItem value={'Female'}>Female</MenuItem>
                         </Select>
                    </FormControl>
                    {claims.role === "Zonal Admin"&&
                         <FormControl variant='standard' >
                              <InputLabel id="foundation" className='selectLabel'>Role</InputLabel>
                              <Select labelId="foundation"id="genderSelect"value={role}label="Church"onChange={(e) => {setRole(e.target.value)}} className={styles.select}>
                                   {isAdmin&&<MenuItem value={'Group Admin'}>Group Admin</MenuItem>}
                                    {isAdmin&&<MenuItem value={'Church Admin'}>Church Admin</MenuItem>}
                                    {!isAdmin&&<MenuItem value={'Member'}>Member</MenuItem>}
                              </Select>
                         </FormControl>
                    }
                    <FormControl variant='standard' >
                         <InputLabel id="foundation" className='selectLabel'>Completed Foundation School</InputLabel>
                         <Select labelId="foundation"id="genderSelect"value={foundationSchool}label="Church"onChange={(e) => {setFoundationSchool(e.target.value)}} className={styles.select}>
                              <MenuItem value={1}>True</MenuItem>
                              <MenuItem value={0}>False</MenuItem>
                         </Select>
                    </FormControl>
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
