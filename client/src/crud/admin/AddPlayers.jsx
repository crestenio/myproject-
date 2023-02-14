import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useNavigate } from 'react-router-dom';


function AddPlayersModal({setter}) {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [middlename, setMiddleName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [team_id, setTeamID] = useState('');

  //back function to go back to previous page
  
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/teams');
  };
  
//
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault()
    try {
        const body = { firstname, lastname, middlename, gender, age, birthday, address, phone, team_id: localStorage.getItem('team_id') }
        const response = await fetch("http://localhost:8000/players", 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
            }
        )
        const playerData = await response.json()
            console.log('Success:', playerData)
    }catch(error) {
        console.log('Error:', error);
      }
    // Logic to save the team data
    setOpen(false);
  };

  return (
    
    <div>
      <Button onClick={handleBack}>Back</Button>
      <Button style={{
                        backgroundColor: '#eb8045',
                        color: '#fff',
                        marginBottom: '22px',
                        marginTop: '18px',
                        marginLeft: '6px'
                    }}  color="primary" onClick={handleClickOpen}>
        Add Players
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Players</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the team.
          </DialogContentText>
          <form onSubmit={handleSave}>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="First Name"
                type="text"
                fullWidth
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Last Name"
                type="text"
                fullWidth
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Middle Name"
                type="text"
                fullWidth
                value={middlename}
                onChange={(e) => setMiddleName(e.target.value)}
            />
            <TextField
                margin="dense"
                id="gender"
                label="Gender"
                type="text"
                fullWidth
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            />

            <TextField
                margin="dense"
                id="age"
                label="Age"
                type="number"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <TextField
                margin="dense"
                id="birthday"
                label="Birthday"
                type="date"
                fullWidth
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
            />
            <TextField
                margin="dense"
                id="address"
                label="Address"
                type="text"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
                margin="dense"
                id="phone"
                label="Phone"
                type="number"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            
          </form>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
    
  );
}

export default AddPlayersModal;