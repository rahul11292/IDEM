import { useEffect } from 'react'
import './App.scss'
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate, useNavigate, useLocation, Location } from "react-router-dom";
import NavBar from './Components/NavBar/NavBar';
import AllCards from './Components/AllCards/AllCards';
import MyCards from './Components/MyCard/MyCards';
import MyHolder from './Components/MyHolder/MyHolder';
import SharedWith from './Components/SharedWith/SharedWith';
import { useAppSelector } from './Hooks/hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RequireAuth } from './Components/Common/RequireAuth';
import CardOpenView from './Components/Common/CardOpenView/CardOpenView';
let theme = createTheme({
  palette: {
    primary: {
      main: '#459d7c',
    },
    secondary: {
      main: '#2F8968',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontSize: "1em"
    },
    fontSize: 12,
  }
});

type stateType ={
  from: { pathname: string }
}

function App() {
  // const [auth, setAuth] = useState(false)
  const response = useAppSelector((state) => state);
  const userId = localStorage.getItem("userId");
 const navigate= useNavigate();
 let history = useLocation();

 
useEffect(()=>{
  navigate(response.auth.location==='/'?history.pathname:response.auth.location, {replace:true})
  },[response.auth.userData])

  if (response.auth.error?.status === 400) {
    toast.error(response.auth.error.message, {
      toastId: "error1",
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (<>
  
      <ThemeProvider theme={theme}>
        <div className="App">
          {/* {userId ? <div className="content">
          {userId && <NavBar></NavBar>}
            <Routes>
              <Route path="/" element={<Navigate to="/allcard" />} />
              <Route path="/allcard" element={<AllCards />} />
              <Route path="/mycards" element={<MyCards />} />
              <Route path="/holder" element={<MyHolder />} />
              <Route path="/sharedwith" element={<SharedWith />} />
              <Route path="/card/:id" element={<CardOpenView />} />
            </Routes>
          </div> : <Routes><Route path="/" element={<LandingPage />} /> <Route path="/*" element={<Navigate to="/" />} /></Routes>} */}

          
<div className={userId ? "content" : ""}>          
          {userId && <NavBar></NavBar>}
            <Routes>
            {userId ? <Route path="/" element={<Navigate to="/allcard" />}/> : <Route path="/" element={<LandingPage />} />} 
              <Route
                path="/allcard"
                element={
                  <RequireAuth>
                    <AllCards />
                  </RequireAuth>
                }
              />
              <Route
                path="/mycards"
                element={
                  <RequireAuth>
                    <MyCards />
                  </RequireAuth>
                }
              />
              <Route
                path="/holder"
                element={
                  <RequireAuth>
                    <MyHolder />
                  </RequireAuth>
                }
              />
              <Route
                path="/sharedwith"
                element={
                  <RequireAuth>
                    <SharedWith />
                  </RequireAuth>
                }
              />
              <Route
                path="/card/:id"
                element={
                  <RequireAuth>
                    <CardOpenView />
                  </RequireAuth>
                }
              />

            </Routes>

                </div>
        </div>
      </ThemeProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
    </>
  )
}

export default App



