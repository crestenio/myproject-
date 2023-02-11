
import React, { useState } from "react";
import { Grid,Paper, Avatar, TextField, Button,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const Login = ({setAuth})=>{
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })
    // const [inputsError, setInputsError] = useState({
    //     username: "",
    //     password: ""
    // })

    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

     //setting the inputs
    const onChange = (e) => {    //username     : barney   
        setInputs({ ...inputs, [e.target.name]: e.target.value })
        // console.log(inputs)
    }
    //deconstructing the username and password variable from the inputs
    const { username, password } = inputs

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            //making a body object from the values of username and password
            const body = { username, password }

            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/Login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const parseRes = await response.json()
                console.log(parseRes)
            if (parseRes.token) {
                //localstorage
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
            } else {
                setAuth(false)
                console.log("Something wrong")
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#eb8045'}
    const btnstyle={backgroundColor:'#eb8045', margin:'8px 0'}
    
    return(
        <>
    
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={onSubmitForm}>
                    <TextField label='Username' name="username" placeholder='Enter username' fullWidth value={username} 
                            onChange={e => onChange(e)}  required/>
                    <TextField label='Password' name="password" placeholder='Enter password' type='password' fullWidth value={password} 
                            onChange={e => onChange(e)}
                             required/>
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                </form>
                <div >
                     <Link href="#" >
                        Forgot password ?
                    </Link>
                </div>
                <div className='sign-up-bottom'> Don't have an account ?
                <a href='Signup'> Sign Up</a>
                </div>
            </Paper>
        </Grid>
        </>
    )
}

export default Login;