import React, { useState, useEffect } from 'react';
import SidebarUser from '../../components/SidebarUser';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});


const StandingsTable = () => {
  const classes = useStyles();
  const [listOfStandings, setListOfStandings] = useState([]);


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
  
  return (
    <>
    <SidebarUser/>

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
                        width: '50%'
                    }}>Basketball System Team Standings </h2>
      
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
};

export default StandingsTable;