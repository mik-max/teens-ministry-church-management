import { createContext, useContext, useEffect, useState } from 'react';


const Context = createContext({

})


export function UserContext({children}){

     const [role, setRole] = useState('')
     const [church, setChurch] = useState('')
     const [firstName, setFirstName] = useState('')
     const [lastName, setlastName] = useState('')
     const [group, setGroup] = useState('')
     const [gender, setGender] = useState('')
     const [zone, setZone] = useState('')
     const [alertText, setAlertText] = useState('')
     const [alertTitle, setAlertTitle] = useState('')
     const [showAlert, setShowAlert] = useState(false)
     const [isLoading, setIsLoading] = useState(false)
     
     return <Context.Provider value={value}>
          {props.children}
     </Context.Provider>
}

export const useAppContext = () => useContext(UserContext);