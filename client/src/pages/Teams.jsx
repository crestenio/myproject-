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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import AddTeamModal from '../pages/AddTeams';
import Fab from '@material-ui/core/Fab';



const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

// const teams = [
//   { id: 1, name: 'Team 1', manager: 'Manager 1', players: 10 },
//   { id: 2, name: 'Team 2', manager: 'Manager 2', players: 12 },
//   { id: 3, name: 'Team 3', manager: 'Manager 3', players: 8 },
//   { id: 4, name: 'Team 4', manager: 'Manager 4', players: 9 },
// ];

export default function BasketballSystemTable() {
  const classes = useStyles();
  const [listOfTeams, setListOfTeams] = useState([]);

  const getTeams = async (e) => {
    const request = "http://localhost:8000/teams/" 
    
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
    
  }
getTeams();

  const handleDelete = async (rowID) => {
    console.log(rowID);
    const request = "http://localhost:8000/teams/" +rowID;
   
    const response = await fetch(request, 
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    
  }

  
    const [searchText, setSearchText] = useState('');
  // const allTeams = allTeams.filter(team =>
  //   team.name.toLowerCase().includes(searchText.toLowerCase())
  // );
  
  // const [tableData, setTableData] = useState(teams);

  // const handleDelete = (id) => {
  //   setTableData(tableData.filter(team => team.id !== id));
  // };

  const handleEdit = (id) => {
    // Code for editing event
  };

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
                        marginTop: '18px'
                    }}>
        <h2>Basketball System Team Information</h2>
        <TextField style={{
                        width: '80%',
                        color: '#eb8045',
                        paddingLeft: '8px'
                       
                    }}
          label="Search"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <AddTeamModal/>
      </TableContainer>
                  
      <TableContainer component={Paper}>
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
                  <IconButton aria-label="edit" onClick={() => handleEdit(row.team_id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(row.team_id)}>
                     <DeleteIcon />
                </IconButton>
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