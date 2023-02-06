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
    minWidth: 900,
  },
});

const teams = [
  { id: 1, name: 'Team 1', manager: 'Manager 1', players: 10 },
  { id: 2, name: 'Team 2', manager: 'Manager 2', players: 12 },
  { id: 3, name: 'Team 3', manager: 'Manager 3', players: 8 },
  { id: 4, name: 'Team 4', manager: 'Manager 4', players: 9 },
];

export default function BasketballSystemTable() {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const [tableData, setTableData] = useState(teams);

  const handleDelete = (id) => {
    setTableData(tableData.filter(team => team.id !== id));
  };

  const handleEdit = (id) => {
    // Code for editing event
  };
  const handleViewPlayers = (id) => {
    console.log(`View players for Team ID ${id}`);
  };


  return (
    <>
    <Sidebar/>
      
    <div>
      
      <h1>Basketball System Team Information</h1>
      <TextField
        label="Search"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <AddTeamModal/>
                  
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='teams table'>
          <TableHead>
            <TableRow>
              <TableCell>Team ID</TableCell>
              <TableCell>Team Name</TableCell>
              <TableCell>Team Manager</TableCell>
              <TableCell>No of Players</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeams.map(team => (
              <TableRow key={team.id}>
                <TableCell component="th" scope="row">
                  {team.id}
                </TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.manager}</TableCell>
                <TableCell>{team.players}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" onClick={() => handleEdit(team.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(team.id)}>
                     <DeleteIcon />
                </IconButton>
                <Button style={{
                        backgroundColor: '#eb8045',
                        color: '#fff',
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewPlayers(team.id)}
                  >
                    View Players
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