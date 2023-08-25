import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Home from "./pages/Home" 
import Login from "./pages/Login" 
import Profile from "./pages/Profile" 
import Register from "./pages/Register" 
import Header from "./components/Header"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import axios from "axios"
import { context, server } from "./main"
import { useContext } from "react"

function App() {
  const{setUser, setIsAuthenticated, setLoading} = useContext(context)
  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/users/me`, {
      withCredentials:true,
    }).then(res=>{
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((error)=>{
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    });
  }, [])
  
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App
