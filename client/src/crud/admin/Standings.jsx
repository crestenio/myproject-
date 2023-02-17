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
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import AddIcon from '@material-ui/icons/Add';
// import Fab from '@material-ui/core/Fab';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import TextField from '@material-ui/core/TextField';
// import DialogActions from '@material-ui/core/DialogActions';
import AddEvent from './AddEvent';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});


const StandingsTable = () => {
  const classes = useStyles();
  const [listOfStandings, setListOfStandings] = useState([]);
//   const [editingStanding, setEditingEvent] = useState({
//     event_id: '',
//     event_name: '',
//     venue: '',
//     date_time: ''
//   });
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState('');

  const getStandings = async (e) => {
    const request = "http://localhost:8000/standings/"
    
    const response = await fetch(request, 
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    const standingsData = await response.json();
    setListOfStandings(standingsData);

  }
  useEffect(() => {
    getStandings();
  }, []);
  
  const updateStandings = async () => {
    const request = "http://localhost:8000/schedule/";
    const response = await fetch(request);
    const gamesData = await response.json();

    const newStandings = listOfStandings.map((standing) => {
      const wins = gamesData.filter(
        (game) =>
          (game.home_team === standing.team_name &&
            game.home_team_score > game.away_team_score) ||
          (game.away_team === standing.team_name &&
            game.away_team_score > game.home_team_score)
      ).length;
      const losses = gamesData.filter(
        (game) =>
          (game.home_team === standing.team_name &&
            game.home_team_score < game.away_team_score) ||
          (game.away_team === standing.team_name &&
            game.away_team_score < game.home_team_score)
      ).length;
      return { ...standing, wins, losses };
    });

    setListOfStandings(newStandings);
  };

  useEffect(() => {
    updateStandings();
  }, []);
  
  // ...

    //wITHToastify//


//   const handleClose = (event, reason) => {
//   if (reason === 'clickaway') {
//     return;
//   }

//   setOpen(false);
//   };


//     const deleteStandings = async (rowID) => {
//     console.log(rowID);

//     const confirmed = window.confirm("Are you sure you want to delete?");

//     if (confirmed) {
//     const request = "http://localhost:8000/standings/" + rowID;
   
//     const response = await fetch(request, 
//         {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//         }
//     )
//     if (response.status === 200) {
//       setMessage("Standings deleted successfully!");
//         setOpen(true)
//         getStandings()
      
//     } else {
//       setMessage("Error deleting standing!") 
//         setOpen(true)
//     }
     
//   }
// }

//   const handleEdit = (event) => {
//     setEditingEvent({
//       event_id: event.event_id,
//       event_name: event.event_name,
//       venue: event.venue,
//       date_time: event.date_time
//     });
//   };

//   const handleSave = async () => {
//     const request = "http://localhost:8000/events/" + editingEvent.event_id;
//     const response = await fetch(request, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(editingEvent)
//     });
//     if (response.status === 200) {
//       setMessage("Event updated successfully!");
//       setOpen(true);
//       getEvents();
//     } else {
//       setMessage("Error updating event!"); 
//       setOpen(true);
//     }
//   };

//   useEffect(() => {
//     getEvents();
//   }, []);


  return (
    <>
    <SidebarAdmin/>

    {/* <Snackbar 
      anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open} 
        onClose={handleClose}
        message={message}
        autoHideDuration={3000}
        
        />
     */}
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
                        width: '20%'
                    }}> Team Standings </h2>
      
      </TableContainer>
      <TableContainer component={Paper} style={{
                        marginLeft: '100px'
                    }}>
        <Table className={classes.table} aria-label="event table">
          <TableHead>
            <TableRow>
              <TableCell >Standing ID</TableCell>
              <TableCell >Team Name</TableCell>
              <TableCell >Wins</TableCell>
              <TableCell >Losses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfStandings.map((event, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {event.standing_id}

                </TableCell>
                <TableCell >{event.team_name}</TableCell>
                <TableCell >{event.wins}</TableCell>
                <TableCell >{event.losses}</TableCell>
                
                {/* <TableCell>
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
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
};

export default StandingsTable;