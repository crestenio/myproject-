import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function AddScheduleModal() {
  const [open, setOpen] = useState(false);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [scheduleVenue, setScheduleVenue] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [teamOptions, setTeamOptions] = useState([]);
  const [userID, setUserID] = useState('');

  useEffect(() => {
  // Logic to fetch all the submitted teams and update the teamOptions state variable
    const fetchTeams = async () => {
      try {
        const request = "http://localhost:8000/teams2/" 
        const response = await fetch(request,
            {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
            }

          );

        const teamData = await response.json();
        setTeamOptions(teamData);

      } catch (error) {
        console.error(error);
      }
    };
     fetchTeams();
    }, []);

      const handleClickOpen = () => {
      setOpen(true);
      };

      const handleClose = () => {
      setOpen(false);
      };

      const handleSave = async (e) => {
    
    // Logic to save the team data
        e.preventDefault()
        try {
          //const teamNames = `${TeamA} VS ${TeamB}`;
          const body = { teamA, teamB, scheduleVenue, scheduleDate, user_id: localStorage.getItem('user_id') }
            console.log(body)
          const response = await fetch("http://localhost:8000/schedule", 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem("token")                 
                
            },
            body: JSON.stringify(body)
            }
        )
          const scheduleData = await response.json()
            console.log('Success:', scheduleData)

        }catch(error) {
        console.log('Error:', error);
       }
    // Logic to save the team data
      setOpen(false);
  };

    return (
        <>
        <div>
          <Button className="schedule-modal"
              style={{
              backgroundColor: '#eb8045',
              color: '#fff',
              marginTop: '18px',
              marginBottom: '22px',
              marginLeft: '14px',
              '&:hover': {
              opacity: 0.6,
                }
              }}
              color="primary"
              onClick={handleClickOpen}
              >
            Add Schedule
        </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Schedule</DialogTitle>
          <DialogContent>
          <DialogContentText>Fill in the details for the team.</DialogContentText>
        <FormControl fullWidth>
            <InputLabel id="opponent-team-a-select-label">Opponent Team A</InputLabel>
            <Select
              labelId="opponent-team-a-select-label"
              id="opponent-team-a-select"
              value={teamA}
              onChange={(e) => setTeamA(e.target.value)}
              >
        <MenuItem value="">
            {/* <em>none</em> */}
            </MenuItem>
            {teamOptions.map((teamData) => (
            <MenuItem key={teamData.team_id} value={teamData.team_name}>
            {teamData.team_name}
        </MenuItem>
            ))}
        </Select>
          </FormControl>
        <FormControl fullWidth>
        <InputLabel id="opponent-team-b-select-label">Opponent Team B </InputLabel>
        <Select
            labelId="opponent-team-b-select-label"
            id="opponent-team-b-select"
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            >
          <MenuItem value="">
            {/* <em>None</em> */}
          </MenuItem>
        {teamOptions.map((teamData) => (
      <MenuItem key={teamData.team_id} value={teamData.team_name}>
              {teamData.team_name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        {/* <TextField
          autoFocus
          margin="dense"
          id="team-name"
          label="Team Name"
          type="text"
          fullWidth
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        /> */}
        <TextField
          autoFocus
          margin="dense"
          id="venue"
          label="Venue"
          type="text"
          fullWidth
          value={scheduleVenue}
          onChange={(e) => setScheduleVenue(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="schedule-date"
          label="Date"
          type="date"
          fullWidth
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
        />
        {/* <TextField
          autoFocus
          margin="dense"
          id="schedule-time"
          label="Time"
          type="time"
          fullWidth
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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

export default AddScheduleModal;