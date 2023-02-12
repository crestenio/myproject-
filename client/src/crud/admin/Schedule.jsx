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
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AddScheduleModal from './AddSchedule';

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
  fab: {
    margin: '10px',
  },
});

// const data = [
//   {
//     id: 1,
//     team1: 'Team A',
//     team2: 'Team B',
//     venue: 'Stadium 1',
//     date: '2022-01-01',
//     time: '10:00 AM',
//   },
//   {
//     id: 2,
//     team1: 'Team C',
//     team2: 'Team D',
//     venue: 'Stadium 2',
//     date: '2022-01-02',
//     time: '12:00 PM',
//   },
//   {
//     id: 3,
//     team1: 'Team E',
//     team2: 'Team F',
//     venue: 'Stadium 3',
//     date: '2022-01-03',
//     time: '2:00 PM',
//   },
// ];

export default function ScheduleTable() {
  const classes = useStyles();
  const [listOfSchedule, setListOfSchedule] = useState([]);
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


  return (
    <>
        <div>
            <SidebarAdmin/>
            <TableContainer component={Paper} style={{
                        backgroundColor: '#fff',
                        marginBottom: '14px',
                        marginTop: '18px',
                        marginLeft: '100px'
                    }}>
              <h2>Basketball System Event Schedule</h2>
          <AddScheduleModal/>
          </TableContainer>
        <TableContainer component={Paper} style={{
                        marginLeft: '100px'
                    }}>
        <Table className={classes.table} aria-label="schedule table">
            <TableHead>
            <TableRow>
                <TableCell>Schedule ID</TableCell>
                <TableCell align="center">Team Names</TableCell>
                <TableCell align="center">Venue</TableCell>
                <TableCell align="center">Date and Time</TableCell>
                <TableCell align="center">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {listOfSchedule.map((row) => (
                <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.schedule_id}
                </TableCell>
                <TableCell align="center">
                    {row.team_name} vs {row.team_name}
                </TableCell>
                <TableCell align="center">{row.venue}</TableCell>
                <TableCell align="center">
                    {row.date_time} 
                </TableCell>
                <TableCell align="center">
                    <Fab
                    size="small"
                    color="primary"
                    className={classes.fab}
                    aria-label="edit"
                    >
                    <EditIcon />
                    
                    </Fab>
                    <Fab
                    size="small"
                    color="secondary"
                    className={classes.fab}
                    aria-label="delete"
                    >
                    <DeleteIcon />
                    </Fab>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    </>
  );
}