import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, Link } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
//import Radio from '@material-ui/core/Radio';
//import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormControl from '@material-ui/core/FormControl';
//import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Signup = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: ""
        
        
    })

    // const [inputsError, setInputsError] = useState({
    //     firstname: "",
    //     lastname: "",
    //     username: "",
    //     password: ""
    // })

    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const onChange = (e) => {    //username     : barney   
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const { firstname, lastname, username, password } = inputs

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            //making a body object from the values of username and password
            const body = { firstname, lastname, username, password }

            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/Signup",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const parseRes = await response.json()

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
    // form-style//

    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#eb8045' }
    //const marginTop = { marginTop: 5 }
    const btnstyle={backgroundColor:'#eb8045'}
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={onSubmitForm}>
                    <TextField fullWidth label='First Name' name="firstname" placeholder="Enter First Name" value={firstname}  
                    onChange={e => onChange(e)}  required />
                    <TextField fullWidth label='Last Name' name="lastname" placeholder="Enter Last Name" value={lastname}
                        onChange={e => onChange(e)}  required />
                    <TextField fullWidth label='Username' name="username" placeholder="Enter your email" value={username}
                        onChange={e => onChange(e)}  required />
                    {/* <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl> */}
                    <TextField fullWidth label='Password' type = "password" name="password" value={password}
                        placeholder="********" 
                        onChange={e => onChange(e)} />
                    <TextField fullWidth label='Confirm Password' type = "password" name="password" value={password}
                        placeholder="********" 
                        onChange={e => onChange(e)} />
                    
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button type='submit' variant='contained' color = "Primary" style={btnstyle}>Sign up</Button>
                </form>
                <div className='sign-up-bottom' > Do you have an account ?
                <a href='Login'>Sign In</a>
                </div>
            </Paper>
        </Grid>
    )
}

export default Signup;