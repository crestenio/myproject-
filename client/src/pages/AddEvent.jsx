import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddEventModal() {
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [userID, setUserID] = useState('');
 
  useEffect(() => {
  const getUserID = async () => {
    try {
      // Make a GET request to the API to obtain the user's ID
      const response = await fetch('http://localhost:8000/users/' + localStorage.getItem('user_id'));
      const data = await response.json();

      // Set the userID state with the user's ID obtained from the API
      setUserID(data.user_id);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  getUserID();
}, []);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (e) => {

    // Logic to save the event data
    e.preventDefault()
    try {
        const body = { eventName, eventDate, eventTime, eventVenue, userID}
        console.log(body)
        const response = await fetch("http://localhost:8000/events",  
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                                
                
            },
            body: JSON.stringify(body)
            }
        )
        const eventData = await response.json()
            console.log('Success:', eventData)
    }catch(error) {
        console.log('Error:', error);
      }
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
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
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

export default AddEventModal;