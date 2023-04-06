import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { API } from './App';
import { useNavigate } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <h1>WELCOME TO THE MOBILE APP</h1>
      <LoginForm/>
    </div>
  );

}

function LoginForm()
{
  const[formState,setFormState]=[];
  const navigate=useNavigate();
  const{values, handleChange, handleSubmit}=useFormik({
    initialValues:{username:"smiley", password:"password@123" },
    onSubmit: async (values)=>{
      console.log("credential", values);

    const data= await fetch(`${API}/users/login`, {
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify(values)
      });

      if(data.status===401){
        console.log("Error");
        setFormState("error");

      }
      else{
        const result = await data.json();
        console.log("success", result);
        localStorage.setItem("token",result.token);
        navigate("/mobiles");
      }


  
    
}});


  return(
    <div>
      <form onSubmit={handleSubmit} className='login-form'>
      <h2>Login</h2>
<div className='login-form-container'>

<TextField  
value={values.username} 
onChange={handleChange}
name="username"
label="Username" 
variant="outlined" 
/>

<TextField 
value={values.password} 
onChange={handleChange}
name="Password"
label="Password" 
variant="outlined" 
/>

<Button  color={formState} variant="contained" type="submit">
  {formState==="success"?"Submit":"Retry"}</Button>
</div>
      </form>
    </div>
  )
}
