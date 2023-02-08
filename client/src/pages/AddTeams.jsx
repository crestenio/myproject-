import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddTeamModal() {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamManager, setTeamManager] = useState('');
  const [numPlayers, setNumPlayers] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (e) => {

    // Logic to save the team data
    e.preventDefault()
    try {
        const body = { teamName, teamManager }
        console.log(body)
        const response = await fetch("http://localhost:8000/teams", 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem("token")                 
                
            },
            body: JSON.stringify(body)
            }
        )
        const data = await response.json()
            console.log('Success:', data)
    }catch(error) {
        console.log('Error:', error);
      }
    // Logic to save the team data
    setOpen(false);
    
  };

  return (
    <div>
      <Button style={{
                        backgroundColor: '#eb8045',
                        color: '#fff',
                        marginBottom: '22px',
                        marginTop: '18px',
                        marginLeft: '6px'
                    }}  color="primary" onClick={handleClickOpen}>
        Add Team
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the team.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Team Name"
            type="text"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="manager"
            label="Team Manager"
            type="text"
            fullWidth
            value={teamManager}
            onChange={(e) => setTeamManager(e.target.value)}
          />
          {/* <TextField
            margin="dense"
            id="players"
            label="Number of Players"
            type="number"
            fullWidth
            value={numPlayers}
            onChange={(e) => setNumPlayers(e.target.value)}
          /> */}
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

export default AddTeamModal;