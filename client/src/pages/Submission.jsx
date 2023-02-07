import React from 'react';
import Sidebar from '../components/Sidebar';
import AddSubmissionModal from '../pages/AddSubmission';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
  fab: {
    margin: '10px',
  },
});

const data = [
  {
    id: 1,
    teamName: 'Team A',
    manager: 'John Doe',
    players: 10,
  },
  {
    id: 2,
    teamName: 'Team B',
    manager: 'Jane Doe',
    players: 12,
  },
  {
    id: 3,
    teamName: 'Team C',
    manager: 'James Doe',
    players: 15,
  },
];

export default function SubmissionTable() {
  const classes = useStyles();

  const handleViewPlayers = (id) => {
    console.log(`View players for submission ID ${id}`);
  };

  return (
    <>
    <div>
        
        <Sidebar/>
      <h1>Basketball System Event Submission</h1>
      <AddSubmissionModal/>
      
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="submission table">
        <TableHead>
          <TableRow>
            <TableCell>Submission ID</TableCell>
            <TableCell align="center">Team Name</TableCell>
            <TableCell align="center">Team Manager</TableCell>
            <TableCell align="center">No of Players</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.teamName}</TableCell>
              <TableCell align="center">{row.manager}</TableCell>
              <TableCell align="center">{row.players}</TableCell>
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
                <Button style={{
                        backgroundColor: '#eb8045',
                        color: '#fff',
                        marginBottom: '22px',
                        marginTop: '18px',
                        marginLeft: '8px'
                    }}
        
                        color="primary"
                        onClick={() => handleViewPlayers(data.id)}
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