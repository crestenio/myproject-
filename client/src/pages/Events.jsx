import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
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
import AddEvent from '../pages/AddEvent';
import { MdRowing } from 'react-icons/md';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});


const EventTable = () => {
  const classes = useStyles();
  const [listOfEvents, setListOfEvents] = useState([]);

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
  getEvents();

    //Toastify//

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
  };


    const deleteEvent = async (rowID) => {
    console.log(rowID);
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

  const handleEdit = (id) => {
    // Code for editing event
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
    <Sidebar/>

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
      <h2>Basketball System Event Table</h2>
      <AddEvent/>
      </TableContainer>
      <TableContainer component={Paper} style={{
                        marginLeft: '100px'
                    }}>
        <Table className={classes.table} aria-label="event table">
          <TableHead>
            <TableRow>
              <TableCell>Event ID</TableCell>
              <TableCell>Event Title</TableCell>
              <TableCell>Event Venue</TableCell>
              <TableCell>Event Date and Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfEvents.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.event_id}</TableCell>
                <TableCell>{row.event_name}</TableCell>
                <TableCell>{row.venue}</TableCell>
                <TableCell>{row.date_time}</TableCell>
                
                <TableCell>
                  <Fab style={{
                      marginRight: '22px'
                                      
                                }}
                      size="small"
                      className={classes.fab}
                      color="primary"
                      aria-label="edit" 
                      onClick={() => handleEdit(row.id)}>
                    <EditIcon />
                  </Fab>
                  <Fab 
                      size="small"
                      className={classes.fab}
                      color="secondary"
                      aria-label="delete" 
                      onClick={() => deleteEvent(row.event_id)}>
                     <DeleteIcon />
                </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
};

export default EventTable;