import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, TableContainer, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddTeamModal from '../admin/AddTeams';
import Fab from '@material-ui/core/Fab';
import { Snackbar } from '@material-ui/core';


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
  const [editingTeams, setEditingTeams] = useState({
    team_id: '',
    team_name: '',
    team_manager: ''
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');


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
    
  //   let myArray = teamData;
  //   let arrayLength = myArray.length;
  //   if (teamData && teamData.length > 0) {
  //   setListOfTeams(teamData);

  //     }else {
  //   setListOfTeams([{ team_id: "", team_name: "", team_manager: "", playerData: [] }]);
  //   }
  // }
    
  }
  useEffect(() => {
  getTeams();
  }, []);

    //wITHToastify//


  const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
  };

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
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed){
    const request = "http://localhost:8000/teams/" + rowID;
   
    const response = await fetch(request, 
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    if (response.status === 200) {
      setMessage("Team deleted successfully!");
        setOpen(true)
        getTeams()
      
    } else {
      setMessage("Error deleting team!") 
        setOpen(true)
    }
    }
     
  }

  const handleEdit = (event) => {
    setEditingTeams({
      team_id: event.team_id,
      team_name: event.team_name,
      team_manager: event.team_manager
    });
  };

  const handleSave = async () => {
    const request = "http://localhost:8000/teams/" + editingTeams.team_id;
    const response = await fetch(request, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editingTeams)
    });
    if (response.status === 200) {
      setMessage("Team updated successfully!");
      setOpen(true);
      getTeams();
    } else {
      setMessage("Error updating team!"); 
      setOpen(true);
    }
  };

   useEffect(() => {
    getTeams();
  }, []);


  //Search bar code//
    const [searchText, setSearchText] = useState('');
    const handleSearch = (event) => {
    const value = event.target? event.target.value : null;
    setSearchText(value);
    console.log(searchText);
    };
    
    const teams = listOfTeams && listOfTeams.length > 0
  ? listOfTeams.filter(teamData => 
      teamData.listOfTeams && teamData.listOfTeams.toLowerCase().includes(searchText.toLowerCase())
    )
  : [];

  console.log(teams);

 
    //const [tableData, setTableData] = useState(teams);

  const handleViewPlayers = (id) => {
    console.log(`View players for Team ID ${id}`);
    localStorage.setItem("team_id", id);
  };

  useEffect(() => {
    getTeams();
    
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
    <div>
        
        <TableContainer component={Paper} style={{
              backgroundColor: '#fff',
              marginBottom: '14px',
              marginTop: '14px',
              marginLeft: '100px'
        }}>
          <h2 style={{
                        backgroundColor: '#fff',
                        marginBottom: '14px',
                        marginTop: '18px',
                        marginLeft: '14px',
                        borderBottom: '2px solid #eb8045',
                        width: '30%'
                    }}>Team Information</h2>
          <TextField style={{
            width: '30%',
            color: '#eb8045',
            
            marginLeft: '14px'
          }}
            label="Search here"
             value={searchText}
             onChange={e => handleSearch(e.target.value)}
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
                  {listOfTeams.map((event, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {event.team_id}
                      </TableCell>
                      <TableCell>{event.team_name}</TableCell>
                      <TableCell>{event.numofplayers}</TableCell>
                      <TableCell>{event.team_manager}</TableCell>
                      
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
                        <Fab style={{
                                      marginRight: '30px'
                                      
                                }}
                             size="small"
                             className={classes.fab}
                             color="secondary"
                             aria-label="delete" 
                             onClick={() => deleteTeam(event.team_id)}>
                          <DeleteIcon />
                        </Fab>
                        <Button className="addplayer-modal"style={{
                          backgroundColor: '#eb8045',
                          color: '#fff',
                        }}
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewPlayers(event.team_id)}
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
            <Dialog open={editingTeams.team_id !== ''} onClose={() => setEditingTeams({team_id: '', team_name: '', team_manager: ''})}>
              <DialogTitle>Edit Team</DialogTitle>
                <DialogContent>
                  <TextField
                  label="Team Name"
                  value={editingTeams.team_name}
                  onChange={(e) => setEditingTeams({...editingTeams, team_name: e.target.value})}
                  fullWidth
                  />
                  <TextField
                  label="Team Manager"
                  value={editingTeams.team_manager}
                  onChange={(e) => setEditingTeams({...editingTeams, team_manager: e.target.value})}
                  fullWidth
                  />
              </DialogContent>
            <DialogActions>
                  <Button onClick={() => setEditingTeams({team_id: '', team_name: '', team_manager: ''})} color="primary">
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