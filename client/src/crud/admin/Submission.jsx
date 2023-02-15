import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import AddSubmissionModal from '../admin/AddSubmission';
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


export default function SubmissionTable() {
  const classes = useStyles();
  const [listOfSubmission, setListOfSubmission] = useState([]);

  const getSubmission = async (e) => {
    const request = "http://localhost:8000/teams1/"
    
    const response = await fetch(request, 
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    const submissionData = await response.json();
    setListOfSubmission(submissionData);
  }
  getSubmission();


    const deleteSubmission = async (rowID) => {
    console.log(rowID);
    const request = "http://localhost:8000/submission/" + rowID;
   
    const response = await fetch(request, 
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
     
  }

    const handleEdit = () => {
      // setSubmission();
      // setOpen(true);
    };


  const handleViewPlayers = (id) => {
    console.log(`View players for submission ID ${id}`);
    localStorage.setItem("user_id", id);
  };

  useEffect(() => {
    getSubmission();
    
  }, []);

  return (
    <>
    <div>
        
        <SidebarAdmin/>
        <TableContainer component={Paper} style={{
                        backgroundColor: '#fff',
                        color: '#000',
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
                        width: '50%'
                    }}>Basketball System Event Submission</h2>
      <AddSubmissionModal/>
      </TableContainer>
    <TableContainer component={Paper} style={{
                        marginLeft: '100px'
                    }}>
      <Table className={classes.table} aria-label="submission table">
        <TableHead>
          <TableRow>
            <TableCell>Submission ID</TableCell>
            <TableCell align="center">Team Name</TableCell>
            <TableCell align="center">Team Manager</TableCell>
            <TableCell align="center">No of Players</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listOfSubmission.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.submission_id}
              </TableCell>
              <TableCell align="center">{row.team_name}</TableCell>
              <TableCell align="center">{row.team_manager}</TableCell>
              <TableCell align="center">{row.numofplayers}</TableCell>
              <TableCell align="center">
                <Fab
                  size="small"
                  color="primary"
                  className={classes.fab}
                  aria-label="edit"
                  onClick={() => handleEdit(row.submission_id)}>
                  <EditIcon />
                </Fab>
                <Fab
                  size="small"
                  color="secondary"
                  className={classes.fab}
                  aria-label="delete"
                  onClick={() => deleteSubmission(row.submission_id)}>
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