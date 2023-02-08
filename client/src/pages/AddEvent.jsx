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
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');

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
        Add Event
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the team.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="event"
            label="Event Title"
            type="text"
            fullWidth
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="date"
            label="Event Date"
            type="date"
            fullWidth
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <TextField
          label="Event Time"
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
          <TextField
            margin="dense"
            id="venue"
            label="Event Venue"
            type="text"
            fullWidth
            value={eventVenue}
            onChange={(e) => setEventVenue(e.target.value)}
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

export default AddTeamModal;