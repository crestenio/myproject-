import React, { useState } from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

const events = [
  {
    id: 1,
    title: 'Event 1',
    date: '2022-01-01',
    time: '10:00 AM',
    venue: 'Venue 1',
  },
  {
    id: 2,
    title: 'Event 2',
    date: '2022-02-01',
    time: '11:00 AM',
    venue: 'Venue 2',
  },
  {
    id: 3,
    title: 'Event 3',
    date: '2022-02-01',
    time: '11:30 AM',
    venue: 'Venue 2',
  },
  // Add more events here
];

const EventTable = () => {
  const classes = useStyles();
  const [tableData, setTableData] = useState(events);

  const handleDelete = (id) => {
    setTableData(tableData.filter(event => event.id !== id));
  };

  const handleEdit = (id) => {
    // Code for editing event
  };

  return (
    <>
    
    <Sidebar/>
    <TableContainer component={Paper} style={{
                        backgroundColor: '#fff',
                        marginBottom: '14px',
                        marginTop: '18px'
                    }}>
      <h2>Basketball System Event Table</h2>
      <AddEvent/>
      </TableContainer>
      <TableContainer component={Paper}>
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
            {tableData.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.id}</TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.date} {event.time}</TableCell>
                <TableCell>{event.venue}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" onClick={() => handleEdit(event.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(event.id)}>
                     <DeleteIcon />
                </IconButton>
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