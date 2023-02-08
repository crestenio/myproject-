import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddScheduleModal() {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [venue, setVenue] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Logic to save the team data
    setOpen(false);
  };

  return (
    <>
    
    <div>
      <Button style={{
                        backgroundColor: '#eb8045',
                        color: '#fff',
                        marginTop: '18px',
                        marginBottom: '22px',
                        marginLeft: '6px'
                    }}  color="primary" onClick={handleClickOpen}>
        Add Schedule
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Schedule</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the team.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Team Name"
            type="text"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="venue"
            label="Venue"
            type="text"
            fullWidth
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
          <TextField
            margin="dense"
            id="date"
            label="Date"
            type="date"
            fullWidth
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
          />
          <TextField
          label="Time"
          type="time"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
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
    </>
  );
}

export default AddScheduleModal;