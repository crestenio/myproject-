import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, TableContainer, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import AddTeamModal from '../pages/AddTeams';
import Fab from '@material-ui/core/Fab';



const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});


export default function BasketballSystemTable() {
  const classes = useStyles();
  const [listOfTeams, setListOfTeams] = useState([]);
  //const [listOfTeamsWithPlayers, setListOfTeamsWithPlayers] = useState([]);
  //const [teamID, setTeamID] = useState({});
  const getTeams = async (e) => {
    const request = "http://localhost:8000/teams1/" 
    
    
    const response = await fetch(request, 
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    const teamData = await response.json();
    setListOfTeams(teamData);
    
    
    // for(let i=0; i<teamData.length; i++){
    //   setTeamID(prevState => {
    //     return {...prevState, teamData[i].team_id: 0};
    //   });
    // }
    
  }
  getTeams();

  // const getNumberOfPlayersPerTeam = async (e) => {
  //   const request = "http://localhost:8000/teams1/" 
    
  //   const response = await fetch(request, 
  //       {
  //       method: 'GET',
  //       headers: {
  //           'Content-Type': 'application/json'
  //       }
  //       }
  //   )
  //   const teamData = await response.json();
  //   setListOfTeamsWithPlayers(teamData);
    
  //   // add code
  //   // update teamID na hook
  // }
  // getNumberOfPlayersPerTeam();

  const deleteTeam = async (rowID) => {
    console.log(rowID);
    const request = "http://localhost:8000/teams/" + rowID;
   
    const response = await fetch(request, 
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
     
  }

  
    // const [searchText, setSearchText] = useState('');
    // const teams = listOfTeams.filter(teamData =>
    //   teamData.listOfTeams.toLowerCase().includes(searchText.toLowerCase())
    // );
    
    // const [tableData, setTableData] = useState(teams);

    //modify button

    // const [selectedTeam, setSelectedTeam] = useState({});

    const handleEdit = (team) => {
      // setSelectedTeam(team);
      // setOpen(true);
    };

    // const handleSave = (e) => {
    //   e.preventDefault();
    //   // Logic to save the team data
    //   if (Object.keys(selectedTeam).length) {
    //     // update existing team data
    //   } else {
    //     // add new team data
    //   }
    //   setOpen(false);
    // };

  const handleViewPlayers = (id) => {
    console.log(`View players for Team ID ${id}`);
    localStorage.setItem("team_id", id);
  };

  useEffect(() => {
    getTeams();
    
  }, []);

  return (
    <>
    
      <Sidebar/>
    <div>
        
        <TableContainer component={Paper} style={{
              backgroundColor: '#fff',
              marginBottom: '14px',
              marginTop: '14px',
              marginLeft: '100px'
        }}>
          <h2>Basketball System Team Information</h2>
          <TextField style={{
            width: '80%',
            color: '#eb8045',
            paddingLeft: '8px'
          }}
            label="Search"
            // value={searchText}
            // onChange={e => setSearchText(e.target.value)}
          />
          <AddTeamModal />
        </TableContainer>
    
            <TableContainer component={Paper} style={{
                        marginLeft: '100px'
                    }}>
              <Table className={classes.table} aria-label='teams table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Team ID</TableCell>
                    <TableCell>Team Name</TableCell>
                    <TableCell>No of Players</TableCell>
                    <TableCell>Team Manager</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listOfTeams.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.team_id}
                      </TableCell>
                      <TableCell>{row.team_name}</TableCell>
                      <TableCell>{row.numofplayers}</TableCell>
                      <TableCell>{row.team_manager}</TableCell>
                      
                      <TableCell>
                        <Fab style={{
                                      marginRight: '22px'
                                      
                                }}
                             size="small"
                             className={classes.fab}
                             color="primary"
                             aria-label="edit" 
                             onClick={() => handleEdit(row.team_id)}>
                          <EditIcon />
                        </Fab>
                        <Fab style={{
                                      marginRight: '30px'
                                      
                                }}
                             size="small"
                             className={classes.fab}
                             color="secondary"
                             aria-label="delete" 
                             onClick={() => deleteTeam(row.team_id)}>
                          <DeleteIcon />
                        </Fab>
                        <Button style={{
                          backgroundColor: '#eb8045',
                          color: '#fff',
                        }}
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewPlayers(row.team_id)}
                        >
                          <a href="players" style={{
                            backgroundColor: '#eb8045',
                            color: '#fff',
                          }}>View Players</a>
                        </Button>
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