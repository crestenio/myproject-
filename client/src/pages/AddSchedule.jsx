import React, { useState } from 'react';
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

const teamOptions = [
  { name: 'Team 1' },
  { name: 'Team 2' },
  { name: 'Team 3' },
  { name: 'Team 4' },
];


function AddScheduleModal() {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [venue, setVenue] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [opponentTeam, setOpponentTeam] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Logic to save the team data
    setOpen(false);
  };

  return (
    <>
    <div>
      <Button style={{
                        backgroundColor: '#eb8045',
                        color: '#fff',
                        marginTop: '18px',
                        marginBottom: '22px',
                        marginLeft: '6px'
                    }}  color="primary" onClick={handleClickOpen}>
        Add Schedule
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Schedule</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the team.
          </DialogContentText>
          <FormControl fullWidth>
          <InputLabel id="opponent-team-select-label">Opponent Team A</InputLabel>
          <Select
            labelId="opponent-team-select-label"
            id="opponent-team-select"
            value={opponentTeam}
            onChange={(e) => setOpponentTeam(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {teamOptions.map((teamOption) => (
              <MenuItem key={teamOption.value} value={teamOption.value}>
                {teamOption.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          <FormControl fullWidth>
          <InputLabel id="opponent-team-select-label">Opponent Team B </InputLabel>
          <Select
            labelId="opponent-team-select-label"
            id="opponent-team-select"
            value={opponentTeam}
            onChange={(e) => setOpponentTeam(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {teamOptions.map((teamOption) => (
              <MenuItem key={teamOption.value} value={teamOption.value}>
                {teamOption.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          <TextField
            margin="dense"
            id="venue"
            label="Venue"
            type="text"
            fullWidth
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
          <TextField
            margin="dense"
            id="date"
            label="Date"
            type="date"
            fullWidth
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
          />
          <TextField
          label="Time"
          type="time"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
        />
          
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