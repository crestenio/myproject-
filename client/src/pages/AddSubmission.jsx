import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddSubmissionModal() {
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
    // Logic to save the submission data
    e.preventDefault()
    try {
        const body = { teamName, teamManager, user_id: localStorage.getItem('user_id') }
        console.log(body)
        const response = await fetch("http://localhost:8000/submission", 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem("token")                 
                
            },
            body: JSON.stringify(body)
            }
        )
        const subData = await response.json()
            console.log('Success:', subData)
    }catch(error) {
        console.log('Error:', error);
      }
      //Logic to save the team data
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
        Submit Your Team
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Submit A Team</DialogTitle>
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
          <TextField
            margin="dense"
            id="players"
            label="Number of Players"
            type="number"
            fullWidth
            value={numPlayers}
            onChange={(e) => setNumPlayers(e.target.value)}
          />
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

export default AddSubmissionModal;