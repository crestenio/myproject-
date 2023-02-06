import React, { useState } from "react";

const AddPlayers = () => {
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        middlename: "",
        age: "",
        address: "",
        phone: ""
    })

    const onChange = e => {    //username     : barney   
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const { firstname, lastname, middlename, gender, age, birthday, address, phone } = inputs

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {firstname, lastname, middlename, gender, age, birthday, address, phone}

            const response = await fetch(
                "http://localhost:8000/Players",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )
            
 
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>
            
            <div className="player-form">
                <h2>Please add  your players information</h2>

                <form className="add-player-form" onSubmit={onSubmitForm}>
                    <input className="input-player-form" 
                        type="text"
                        name="firstname"
                        value={firstname}
                        placeholder= "First Name"
                        onChange={e => onChange(e)} />
                    <input className="input-player-form" 
                        type="text"
                        name="lastname"
                        value={lastname}
                        placeholder= "Last Name"
                        onChange={e => onChange(e)} />
               
                    <input className="input-player-form" 
                        type="text"
                        name="middlename"
                        value={middlename}
                        placeholder= "Middle Name"
                        onChange={e => onChange(e)} />
                   
                    <input className="input-player-form" 

                        type="text"
                        name="gender"
                        value={gender}
                        placeholder="Gender" 
                        onChange={e => onChange(e)} />
                        
                    <input className="input-player-form" 
                        type="text"
                        name="age"
                        value={age}
                        placeholder="Age" 
                        onChange={e => onChange(e)} />
                    <input className="input-player-form" 
                        type="text"
                        name="birthday"
                        value={birthday}
                        placeholder="Birthday" 
                        onChange={e => onChange(e)} />
                    <input className="input-player-form" 
                        type="text"
                        name="address"
                        value={address}
                        placeholder="Address" 
                        onChange={e => onChange(e)} />
                    <input className="input-player-form" 
                        type="text"
                        name="phone"
                        value={phone}
                        placeholder="Phone" 
                        onChange={e => onChange(e)} />

                    <button className="btn" type="submit">Submit</button>
                
                </form>
                
            </div>
        </>
    )
}
export default AddPlayers;