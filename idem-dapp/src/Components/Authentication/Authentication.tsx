
import { Divider, Button, Checkbox, FormControlLabel } from '@mui/material';
import GoogleLogo from './../../Assets/Images/googleLogo.svg';
import './Authentication.scss';
import { useState } from 'react';
import { validatorUserLogin, validatorUserSignup } from './../Validator';
import Input from './../Common/Input';
import { useAppSelector, useAppDispatch } from './../../Hooks/hooks';
import { loginUser } from './AuthenticationSlice';
import { Location, useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';


export type UserLogin = {
  account: {
    emailOrNumber: string,
    password: string,
  },
  keepLogedIn: boolean,
  entryEmail: boolean,
  error: { [key: string]: string; } | null
}

export type UserSignUp = {
  account: {
    name: string,
    emailOrNumber: string
    password: string
  },
  entryEmail: boolean,
  error: { [key: string]: string; } | null
}

const initialLoginState: UserLogin = {
  account: {
    emailOrNumber: "",
    password: "",
  },
  keepLogedIn: true,
  entryEmail: true,
  error: null
}

const initialSignupState: UserSignUp = {
  account: {
    name: "",
    emailOrNumber: "",
    password: ""
  },
  entryEmail: true,
  error: null
}

export default function Authentication() {
  const userData  = useAppSelector((state)=> state.auth)
  const dispatch = useAppDispatch()
  const [isLogin, setIsLogin] = useState(true);
  const [userLogin, setUserLogin] = useState<UserLogin>(initialLoginState)
  const [userSignup, setUserSignup] = useState<UserSignUp>(initialSignupState)
  const navigate = useNavigate()
 
  //Change the authentication type
  function changeAuthHandler() {
    setIsLogin(!isLogin)
    setUserLogin({ ...initialLoginState });
    setUserSignup({ ...initialSignupState })
  }
  //input change handler
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (isLogin) {
      const account = { ...userLogin.account };
      account[event.target.name as keyof typeof userLogin.account] = event.target.value;
      setUserLogin({ ...userLogin, account, error:null}) 
      
    }
    else {
      setUserLogin({...userLogin, error:null})
      const account = { ...userSignup.account };
      account[event.target.name as keyof typeof userSignup.account] = event.target.value;
      setUserSignup({ ...userSignup, account, error:null})
    }
  }

  //handle submit form
 function submitAuthForm() {
    if (isLogin) {
       setUserLogin({
        ...userLogin,
        ...validatorUserLogin(userLogin.account)
      })
      if(!validatorUserLogin(userLogin.account).error){
        dispatch(loginUser(userLogin)) 
      }
    }
    else {
      const validatorResponse = {
        ...userSignup,
        ...validatorUserLogin(userSignup.account)
      }
      setUserSignup(validatorResponse)
    }
  }




  //Form for log in 
  function loginForm() {
    return <>
      <Input label="Email or Phone number" name="emailOrNumber" onChange={changeHandler} value={userLogin.account.emailOrNumber} validator={userLogin.error?.emailOrNumber} />
      <Input label="Password" name="password" isPassword={true} onChange={changeHandler} value={userLogin.account.password} validator={userLogin.error?.password} />
      <div className='loginOption'>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Keep me loged-in" />
        <a href="#">Forgot Password ?</a>
      </div>
      <Button type="submit" variant="contained" size="medium" disabled={userLogin.error ? true : false} onClick={()=>submitAuthForm()} >Login</Button>
    </>
  }
  //Form for Sign In
  function signupForm() {
    return <>
      <Input label="Name" name="name" onChange={changeHandler} value={userSignup.account.name} validator={userSignup.error?.name} />
      <Input label="Email or Phone number" name="emailOrNumber" onChange={changeHandler} value={userSignup.account.emailOrNumber} validator={userSignup.error?.emailOrNumber} />
      <Input label="Password" name="password" isPassword={true} onChange={changeHandler} value={userSignup.account.password} validator={userSignup.error?.password} />
      <Button type="submit" variant="contained" size="medium" disabled={userSignup.error ? true : false} onClick={()=>submitAuthForm()}>Create account</Button>
    </>
  }
  //Ui component for Authentication
  return (
    <>
    <PropagateLoader color={"#459d7c"} loading={userData.isLoading} size={20} />
    <div className='registration'>
      <div className="registrationForm">
        <h2>IDEM</h2>
        <div className="registerWithGoogleOption">
          <a> {isLogin ? "Login with" : "Sign up with"} <img src={GoogleLogo} alt="Google button for login with google" /></a>
        </div>
        <Divider>OR</Divider>
          {isLogin ? loginForm() : signupForm()}
      </div>
      <div className="registrationFormSwtich">
        <p>{isLogin ? "New to Idem ?" : "Already have a card ? "}<Button variant="text" onClick={changeAuthHandler}>{isLogin ? "Create an account" : "Login"}</Button></p>
      </div>
    </div>
    
    </>

  )
}



