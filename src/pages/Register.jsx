import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { context, server } from "../main"
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(context);

  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      console.log(name, email, password);
      const { data } = await axios.post(`${server}/users/new`,
        {
          name,
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      )
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false)
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
      setIsAuthenticated(false);
      setLoading(false)
    }
  };
  if (isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
          <button type='submit'>Signup</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  )
}

export default Register