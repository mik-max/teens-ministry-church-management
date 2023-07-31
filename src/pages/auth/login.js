import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';


import { useAuthContext } from 'src/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';


const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');

  const [isLoading, setIsLoading] = useState(false)

//   const signIn =  (email, password) => {
//      e.preventDefault();
//      if(email.value != ''  && password.value != ''){

//           let payload = {
//                email: email.value,
//                password: password.value
//           }
//           loader.classList.remove('hideLoader')
//           fetch(`${DEVBASEURL}/api/v1/user/login`, {
//                method: 'POST',
//                headers: {
//                     'Accept': 'application/json',
//                     'Access-Control-Allow-Origin': '*',
//                     'Content-Type': 'application/json'
//                },
//                body: JSON.stringify(payload)
//           }).then(response => {return response.json()}).then((data) => {
//                if(data.status == 'Ok'){
//                     setAlertText(data.message);
//                     setAlertTitle('Success!');
//                     setIsLoading(false);
//                     setShowAlert(true);
//                     localStorage.setItem('token', data.data.token)
//                     localStorage.setItem('claims', JSON.stringify(data.data.claims))
//                     email.value = '';  password.value = '';
                   
//                }else{ 
//                     setAlertText(data.message);
//                     setAlertTitle('Error!');
//                     setIsLoading(false);
//                     setShowAlert(true);
//                }
               
//           }).catch(e => {
//                return e.message
//           })
//      }else{
//           setIsLoading(false)
//                setAlertText("Kindly fill out all fields.");
//                setAlertTitle('Incomplete! 😒');

//                setShowAlert(true)
//      }

//   };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
          await auth.signIn(values.email, values.password);

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/');
    },
    [auth, router]
  );

  return (
    <>
      <Head>
        <title>
          Login | Teens Ministry
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Email"
                value="email"
              />
        
            </Tabs>
            {method === 'email' && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {/* <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText> */}
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained" >
                  Log In
                </Button>
                
                <Alert color="primary" severity="info" sx={{ mt: 3 }}>
                  <div>Loveworld Teens Ministry</div>
                </Alert>
              </form>
            )}
            
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
