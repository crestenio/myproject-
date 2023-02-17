import React, { useState, useEffect } from 'react';
import SidebarUser from '../../components/SidebarUser';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
  fab: {
    margin: '10px',
  },
});


export default function ScheduleTable() {
  const classes = useStyles();
  const [listOfSchedule, setListOfSchedule] = useState([]);
  const [editingSchedule, setEditingSchedule] = useState({
    schedule_id: '',
    teamA: '',
    teamB: '',
    venue: '',
    date_time: ''
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const getSchedule = async (e) => {
    const request = "http://localhost:8000/schedule/" 
    
    const response = await fetch(request, 
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    const scheduleData = await response.json();
    setListOfSchedule(scheduleData);
    
  }
  getSchedule();

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
      return;
    }

  setOpen(false);
  };

    const deleteSchedule = async (rowID) => {
    console.log(rowID);

    const confirmed = window.confirm("Are you sure you want to delete?");

    if (confirmed) {
    const request = "http://localhost:8000/schedule/" + rowID;
   
    const response = await fetch(request, 
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    if (response.status === 200) {
      setMessage("Schedule deleted successfully!");
        setOpen(true)
        getSchedule()
      
    } else {
      setMessage("Error deleting schedule!") 
        setOpen(true)
    }
     
  }
}

  const handleEdit = (event) => {
    setEditingSchedule({
      schedule_id: event.schedule_id,
      teamA: event.teamA,
      teamB: event.teamB,
      venue: event.venue,
      date_time: event.date_time
    });
  };

    const handleSave = async () => {
    const request = "http://localhost:8000/schedule/" + editingSchedule.schedule_id;
    const response = await fetch(request, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editingSchedule)
    });
    if (response.status === 200) {
      setMessage("Schedule updated successfully!");
      setOpen(true);
      getSchedule();
    } else {
      setMessage("Error updating schedule!"); 
      setOpen(true);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);



  return (
    <>
        <div>
            <SidebarUser/>
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
                        width: '25%'
                    }}>Game Schedule</h2>
          
          </TableContainer>
        <TableContainer component={Paper} style={{
                        marginLeft: '100px'
                    }}>
        <Table className={classes.table} aria-label="schedule table">
            <TableHead>
            <TableRow>
                <TableCell>Schedule ID</TableCell>
                <TableCell align="center">Team A</TableCell>
                <TableCell align="center">Team B</TableCell>
                <TableCell align="center">Venue</TableCell>
                <TableCell align="center">Date & Time</TableCell>
                {/* <TableCell align="center">Actions</TableCell> */}
            </TableRow>
            </TableHead>
            <TableBody>
            {listOfSchedule.map((event, index) => (
                <TableRow key={event.id}>
                <TableCell component="th" scope="row">
                    {event.schedule_id}
                </TableCell>
                <TableCell align="center">
                    {event.teamA} 
                </TableCell>
                <TableCell align="center">
                    {event.teamB} 
                </TableCell>
                <TableCell align="center">{event.venue}</TableCell>
                <TableCell align="center">
                    {event.date_time} 
                </TableCell>
                <TableCell align="center">
                    {/* <Fab
                    size="small"
                    color="primary"
                    className={classes.fab}
                    aria-label="edit"
                    onClick={() => handleEdit(event)}>
                    
                    <EditIcon />
                    
                    </Fab>
                    <Fab
                    size="small"
                    color="secondary"
                    className={classes.fab}
                    aria-label="delete"
                    onClick={() => deleteSchedule(event.schedule_id)}>
                    
                    <DeleteIcon />
                    </Fab> */}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
          <Dialog open={editingSchedule.schedule_id !== ''} onClose={() => setEditingSchedule({schedule_id: '', teamA: '', teamB: '', venue: '', date_time: ''})}>
        <DialogTitle>Edit Schedule</DialogTitle>
          <DialogContent>
            <TextField
            label="Opponent Team A"
            value={editingSchedule.teamA}
            onChange={(e) => setEditingSchedule({...editingSchedule, teamA: e.target.value})}
            fullWidth
            />
            <TextField
            label="Opponent Team B"
            value={editingSchedule.teamB}
            onChange={(e) => setEditingSchedule({...editingSchedule, teamB: e.target.value})}
            fullWidth
            />
            <TextField
            label="Venue"
            value={editingSchedule.venue}
            onChange={(e) => setEditingSchedule({...editingSchedule, venue: e.target.value})}
            fullWidth
            />
            <TextField
            label="Date & Time"
            value={editingSchedule.date_time}
            onChange={(e) => setEditingSchedule({...editingSchedule, date_time: e.target.value})}
            fullWidth
            />
        </DialogContent>
      <DialogActions>
            <Button onClick={() => setEditingSchedule({schedule_id: '', teamA: '', teamB: '', venue: '', date_time: ''})} color="primary">
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