import React, { useState, useEffect } from "react";
import SidebarAdmin from '../components/SidebarAdmin';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Avatar,
  Popover,
  List,
  ListItem,
  ListItemText,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  card: {
    marginTop: 20,
  },
  cardContent: {
    padding: 20,
  },
  cardActions: {
    padding: 10,
    display: "flex",
    justifyContent: "flex-end",
  },
  accountSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
  },
  accountAvatar: {
    marginRight: 10,
  },
});

const BasketballSystemDashboard = () => {
  const classes = useStyles();
  const [teamsSubmitted, setTeamsSubmitted] = useState();
  const [listOfEvents, setListOfEvents] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
        localStorage.removeItem('user.token')
        localStorage.removeItem('user.user_id')
        window.location = "/"
    }

    useEffect(() => {
    fetch("http://localhost:8000/count-teams1/")
      .then(response => response.json())
      .then(data => setTeamsSubmitted(data.totalTeams))
  }, [])


  const getEvents = async (e) => {
    const request = "http://localhost:8000/events/"
    
    const response = await fetch(request, 
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    const eventData = await response.json();
    setListOfEvents(eventData);

  }
  useEffect(() => {
    getEvents();
  }, []);
    

  return (
    <>
    <SidebarAdmin/>
    <Grid component={Paper} className={classes.root} style={{
                        
                        marginBottom: '14px',
                        marginTop: '18px',
                        width: '70%',
                        marginLeft: '300px'
                      
                    }}>
      <div className={classes.accountSection} style={{ 
                        position: 'absolute', 
                        top: 0, 
                        right: 0,
                      
                       }}>
        <Avatar className={classes.accountAvatar}>A</Avatar>
        <Typography variant="body1">Admin</Typography>
        <IconButton onClick={handleClick}>
          <SettingsIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <List>
            <ListItem button>
              <ListItemText primary="Account Settings" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Sign Out" onClick={handleLogout} />
            </ListItem>
          </List>
        </Popover>
      </div>
      <Grid  container spacing={2} style={{
                        
                        marginBottom: '14px',
                        marginTop: '100px',
                         width: '100%',
                    
                    }}>
        <Grid item xs={14} sm={6}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5">Total Teams Submitted</Typography>
                <Typography variant="body1">{teamsSubmitted}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
               <a href="teams">View</a> 
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={14} sm={6}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5">Team Standing</Typography>
                <Typography variant="body1">
                  
                </Typography>
                <Typography variant="body1">
                  
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                <a href="standings">View</a>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={14} sm={6}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5">Past and Upcoming Schedule</Typography>
                <Typography variant="body1">
                  Upcoming: Feb 10, 7:30 PM Purok 2 VS Purok 3
                </Typography>
            
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                <a href="schedule">View</a>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={14} sm={6}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5">Event Announcements</Typography>
                <Typography variant="body1">
                  One-Day League Tournament
                </Typography>
                
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                <a href="events">View</a>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
};

export default BasketballSystemDashboard;