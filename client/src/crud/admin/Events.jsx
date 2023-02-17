import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import AddEvent from './AddEvent';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});


const EventTable = () => {
  const classes = useStyles();
  const [listOfEvents, setListOfEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState({
    event_id: '',
    event_name: '',
    venue: '',
    date_time: ''
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const getEvents = async (e) => {
    const request = "http://localhost:8000/events/"
    
    const response = await fetch(request, 
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    const eventData = await response.json();
    setListOfEvents(eventData);

  }
  useEffect(() => {
    getEvents();
  }, []);
  

    //wITHToastify//


  const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
  };


    const deleteEvent = async (rowID) => {
    console.log(rowID);

    const confirmed = window.confirm("Are you sure you want to delete?");

    if (confirmed) {
    const request = "http://localhost:8000/events/" + rowID;
   
    const response = await fetch(request, 
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    if (response.status === 200) {
      setMessage("Event deleted successfully!");
        setOpen(true)
        getEvents()
      
    } else {
      setMessage("Error deleting event!") 
        setOpen(true)
    }
     
  }
}

  const handleEdit = (event) => {
    setEditingEvent({
      event_id: event.event_id,
      event_name: event.event_name,
      venue: event.venue,
      date_time: event.date_time
    });
  };

  const handleSave = async () => {
    const request = "http://localhost:8000/events/" + editingEvent.event_id;
    const response = await fetch(request, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editingEvent)
    });
    if (response.status === 200) {
      setMessage("Event updated successfully!");
      setOpen(true);
      getEvents();
    } else {
      setMessage("Error updating event!"); 
      setOpen(true);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);


  return (
    <>
    <SidebarAdmin/>

    <Snackbar 
      anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open} 
        onClose={handleClose}
        message={message}
        autoHideDuration={3000}
        
        />
    
    <TableContainer component={Paper} style={{
                        backgroundColor: '#fff',
                        marginBottom: '14px',
                        marginTop: '18px',
                        marginLeft: '100px'
                    }}>
      <h2 style={{
                        backgroundColor: '#fff',
                        marginBottom: '14px',
                        marginTop: '18px',
                        marginLeft: '14px',
                        borderBottom: '2px solid #eb8045',
                        width: '50%'
                    }}>Basketball Event Announcements</h2>
      <AddEvent/>
      </TableContainer>
      <TableContainer component={Paper} style={{
                        marginLeft: '100px'
                    }}>
        <Table className={classes.table} aria-label="event table">
          <TableHead>
            <TableRow>
              <TableCell >Event ID</TableCell>
              <TableCell >Event Title</TableCell>
              <TableCell >Event Venue</TableCell>
              <TableCell >Event Date and Time</TableCell>
              <TableCell >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfEvents.map((event, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {event.event_id}

                </TableCell>
                <TableCell >{event.event_name}</TableCell>
                <TableCell >{event.venue}</TableCell>
                <TableCell >{event.date_time}</TableCell>
                
                <TableCell>
                  <Fab style={{
                      marginRight: '22px'
                                      
                                }}
                      size="small"
                      className={classes.fab}
                      color="primary"
                      aria-label="edit" 
                      onClick={() => handleEdit(event)}>
                    <EditIcon />
                  </Fab>
                  <Fab 
                      size="small"
                      className={classes.fab}
                      color="secondary"
                      aria-label="delete" 
                      onClick={() => deleteEvent(event.event_id)}>
                     <DeleteIcon />
                </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <Dialog open={editingEvent.event_id !== ''} onClose={() => setEditingEvent({event_id: '', event_name: '', venue: '', date_time: ''})}>
        <DialogTitle>Edit Event</DialogTitle>
          <DialogContent>
            <TextField
            label="Event Name"
            value={editingEvent.event_name}
            onChange={(e) => setEditingEvent({...editingEvent, event_name: e.target.value})}
            fullWidth
            />
            <TextField
            label="Venue"
            value={editingEvent.venue}
            onChange={(e) => setEditingEvent({...editingEvent, venue: e.target.value})}
            fullWidth
            />
            <TextField
            label="Date & Time"
            value={editingEvent.date_time}
            onChange={(e) => setEditingEvent({...editingEvent, date_time: e.target.value})}
            fullWidth
            />
        </DialogContent>
      <DialogActions>
            <Button onClick={() => setEditingEvent({event_id: '', event_name: '', venue: '', date_time: ''})} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
        </DialogActions>
      </Dialog>
  </>
  );
};

export default EventTable;