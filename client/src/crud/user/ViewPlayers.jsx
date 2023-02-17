import React, { useState, useEffect } from 'react';
import SidebarUser from '../../components/SidebarUser';
import AddPlayersModal from '../admin/AddPlayers';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {Paper, TableContainer } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Snackbar } from '@material-ui/core';





const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  fab: {
    margin: '10px',
  },
});


const PlayerTable = () => {
  const classes = useStyles();
  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState({
    player_id: '',
    firstname: '',
    lastname: '',
    middlename: '',
    gender: '',
    age: '',
    birthday: '',
    address: '',
    phone: ''
  });
 // const [adder, setAdder] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const getPlayers = async (e) => {
    const request = "http://localhost:8000/team/players/" + localStorage.getItem("team_id");
    
    const response = await fetch(request, 
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    const playerData = await response.json();
    setListOfPlayers(playerData);
  }
  useEffect(() => {
    getPlayers();
  }, []);
  

  //Toastify//

  const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
  };

  const deletePlayer = async (rowID) => {
    console.log(rowID);

    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
    const request = "http://localhost:8000/players/" +rowID;
   
    const response = await fetch(request, 
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    if (response.status === 200) {
      setMessage("Player deleted successfully!");
        setOpen(true)
        getPlayers()
      
    } else {
      setMessage("Error deleting player!") 
        setOpen(true)
      }
    }
  }


  const handleEdit = (event) => {
    setEditingPlayer({
      player_id: event.player_id,
      firstname: event.firstname,
      lastname: event.lastname,
      middlename: event.middlename,
      gender: event.gender,
      age: event.age,
      birthday: event.birthday,
      address: event.address,
      phone: event.phone
    });
  };

  const handleSave = async () => {
    const request = "http://localhost:8000/players/" + editingPlayer.player_id;
    const response = await fetch(request, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editingPlayer)
    });
    if (response.status === 200) {
      setMessage("Player updated successfully!");
      setOpen(true);
      getPlayers();
    } else {
      setMessage("Error updating player!"); 
      setOpen(true);
    }
  };
  // const handleViewPlayers = (id) => {
  //   console.log(`View players for submission ID ${id}`);
  // };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <>
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
    <div>
      
      <TableContainer component={Paper} style={{
                        backgroundColor: '#fff',
                        marginBottom: '14px',
                        marginTop: '18px',
                        width: '80%',
                        marginLeft: '240px'
                    }}>
        <SidebarUser/>
        <h2 style={{
                        backgroundColor: '#fff',
                        marginBottom: '14px',
                        marginTop: '18px',
                        marginLeft: '14px',
                        borderBottom: '2px solid #eb8045',
                        width: '50%'
                    }}>Team Players Information</h2>
        <AddPlayersModal />
      </TableContainer>
      
    <TableContainer component={Paper} style={{ width: '80%',
                                               marginLeft: '240px' }} >
      <Table className={classes.table} aria-label="player table">
        <TableHead>
          <TableRow>
            <TableCell>Player ID</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Middle Name</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Birthday</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listOfPlayers.map((event, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {event.player_id}
              </TableCell>
              <TableCell align="center">{event.firstname}</TableCell>
              <TableCell align="center">{event.lastname}</TableCell>
              <TableCell align="center">{event.middlename}</TableCell>
              <TableCell align="center">{event.gender}</TableCell>
              <TableCell align="center">{event.age}</TableCell>
              <TableCell align="center">{event.birthday}</TableCell>
              <TableCell align="center">{event.address}</TableCell>
              <TableCell align="center">{event.phone}</TableCell>
              <TableCell align="center">
                <Fab
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
                  onClick={() => deletePlayer(event.player_id)}
                >
                 <DeleteIcon />
                </Fab>
          
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      
      </TableContainer>
      <Dialog open={editingPlayer.player_id !== ''} onClose={() => setEditingPlayer({player_id: '', firstname: '', lastname: '', middlename: '', gender: '', age: '', birthday: '', address: '', phone: ''})}>
        <DialogTitle>Edit Player</DialogTitle>
          <DialogContent>
            <TextField
            label="First Name"
            value={editingPlayer.firstname}
            onChange={(e) => setEditingPlayer({...editingPlayer, firstname: e.target.value})}
            fullWidth
            />
            <TextField
            label="Last Name"
            value={editingPlayer.lastname}
            onChange={(e) => setEditingPlayer({...editingPlayer, lastname: e.target.value})}
            fullWidth
            />
            <TextField
            label="Middle Name"
            value={editingPlayer.middlename}
            onChange={(e) => setEditingPlayer({...editingPlayer, middlename: e.target.value})}
            fullWidth
            />
            <TextField
            label="Gender"
            value={editingPlayer.gender}
            onChange={(e) => setEditingPlayer({...editingPlayer, gender: e.target.value})}
            fullWidth
            />
            <TextField
            label="Age"
            value={editingPlayer.age}
            onChange={(e) => setEditingPlayer({...editingPlayer, gender: e.target.value})}
            fullWidth
            />
            <TextField
            label="Birthday"
            type="date"
            value={editingPlayer.birthday}
            onChange={(e) => setEditingPlayer({...editingPlayer, birthday: e.target.value})}
            fullWidth
            />
            <TextField
            label="Address"
            value={editingPlayer.address}
            onChange={(e) => setEditingPlayer({...editingPlayer, address: e.target.value})}
            fullWidth
            />
            <TextField
            label="Phone"
            value={editingPlayer.phone}
            onChange={(e) => setEditingPlayer({...editingPlayer, phone: e.target.value})}
            fullWidth
            />
        </DialogContent>
      <DialogActions>
            <Button onClick={() => setEditingPlayer({player_id: '', firstname: '', lastname: '', middlename: '', gender: '', age: '', birthday: '', address: '', phone: ''})} color="primary">
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

export default PlayerTable;