import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AddPlayersModal from '../pages/AddPlayers';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import { Grid, Paper, TableContainer } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  fab: {
    margin: '10px',
  },
});


export default function PlayerTable() {
  const classes = useStyles();
  const [listOfPlayers, setListOfPlayers] = useState([]);
 // const [adder, setAdder] = useState(0);
  
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
    const data2 = await response.json();
    setListOfPlayers(data2);
  }
  getPlayers();

  const deletePlayer = async (rowID) => {
    console.log(rowID);
    const request = "http://localhost:8000/players/" +rowID;
   
    const response = await fetch(request, 
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    
  }

  const editPlayer = async (rowID) => {
    console.log(rowID);
    const request = "http://localhost:8000/players/" +rowID;
   
    const response = await fetch(request, 
        {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    getPlayers();
  }

  // const handleViewPlayers = (id) => {
  //   console.log(`View players for submission ID ${id}`);
  // };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <>
    <div>
      
      <TableContainer component={Paper} style={{
                        backgroundColor: '#fff',
                        marginBottom: '14px',
                        marginTop: '18px',
                        width: '80%',
                        marginLeft: '240px'
                    }}>
        <Sidebar/>
        <h2>Basketball System Players Information</h2>
        <AddPlayersModal />
      </TableContainer>
      
    <TableContainer component={Paper} style={{ width: '80%',
                                               marginLeft: '240px' }} >
      <Table className={classes.table} aria-label="submission table">
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
          {listOfPlayers.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.firstname}</TableCell>
              <TableCell align="center">{row.lastname}</TableCell>
              <TableCell align="center">{row.middlename}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">{row.age}</TableCell>
              <TableCell align="center">{row.birthday}</TableCell>
              <TableCell align="center">{row.address}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">
                <Fab
                  size="small"
                  color="primary"
                  className={classes.fab}
                  aria-label="edit"
                  onClick={() => editPlayer(row.player_id)}
                >
                  <EditIcon />
                </Fab>
                <Fab
                  size="small"
                  color="secondary"
                  className={classes.fab}
                  aria-label="delete"
                  onClick={() => deletePlayer(row.player_id)}
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