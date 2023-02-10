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

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

// const events = [
//   {
//     id: 1,
//     title: 'Event 1',
//     date: '2022-01-01',
//     time: '10:00 AM',
//     venue: 'Venue 1',
//   },
//   {
//     id: 2,
//     title: 'Event 2',
//     date: '2022-02-01',
//     time: '11:00 AM',
//     venue: 'Venue 2',
//   },
//   {
//     id: 3,
//     title: 'Event 3',
//     date: '2022-02-01',
//     time: '11:30 AM',
//     venue: 'Venue 2',
//   },
//   // Add more events here
// ];

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
              <TableCell>Event Date and Time</TableCell>
              <TableCell>Event Venue</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfEvents.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.event_id}</TableCell>
                <TableCell>{row.event_name}</TableCell>
                <TableCell>{row.date_time}</TableCell>
                <TableCell>{row.venue}</TableCell>
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