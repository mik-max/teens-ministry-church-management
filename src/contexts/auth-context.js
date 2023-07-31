import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

const DEVBASEURL = "https://teens-church-report-api.onrender.com"
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
     const router = useRouter()
     const { children } = props;
     const [state, dispatch] = useReducer(reducer, initialState);
     const [userData, setUserData] = useState({})
     const [isLoading, setIsLoading] = useState(false)
     const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser',
        email: 'anika.visser@devias.io'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password) => {
     
     if(email != ''  && password != ''){

          let payload = {
               email: email,
               password: password
          }
          fetch(`${DEVBASEURL}/api/v1/user/login`, {
               method: 'POST',
               headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(payload)
          }).then(response => {return response.json()}).then((data) => {
               console.log(data)
               if(data.status == 'Ok'){
                    Swal.fire({
                         title: 'Success!',
                         text: data.message,
                         icon: 'success',
                         confirmButtonText: 'Thanks'
                    }).then(() => {
                         localStorage.setItem('token', data?.data.token);
                         setUserData(data.data.claims);
                         localStorage.setItem('claims', JSON.stringify(data.data.claims));
                         router.push('/')
                         email = '';  password = '';

                         const user = {
                              id: '5e86809283e28b96d2d38537',
                              avatar: '/assets/avatars/avatar-anika-visser.png',
                              name: 'Anika Visser',
                              email: 'anika.visser@devias.io'
                            };
                        
                            dispatch({
                              type: HANDLERS.SIGN_IN,
                              payload: user
                            });
                    })

                 
               }else{ 
                    Swal.fire({
                         title: 'Error!',
                         text: data.message,
                         icon: 'error',
                         confirmButtonText: 'Close'
                    })
                    
               }
               
          }).catch(e => {
               return e.message
          })
     }else{
          Swal.fire({
               title: 'Incomplete! 😒',
               text: "Kindly fill out all fields.",
               icon: 'error',
               confirmButtonText: 'Ooops 😁'
          })
          
     }


    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    
  };

  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
     router.push('/auth/login')
     window.location.href='/auth/login'
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
    localStorage.removeItem('token');
    localStorage.removeItem('claims');
   
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
