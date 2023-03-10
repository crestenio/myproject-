import React, { useState } from "react";
import SidebarUser from '../components/SidebarUser';
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
    padding: 20,
  },
  accountAvatar: {
    marginRight: 10,
  },
});

const BasketballSystemDashboard = () => {
  const classes = useStyles();
  const [teamsSubmitted, setTeamsSubmitted] = useState(0);
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
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        window.location = "/"
    }
    

  return (
    <>
    <SidebarUser/>
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
        <Typography variant="body1">Account Name</Typography>
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
      <Grid container spacing={2} style={{
                        
                        marginBottom: '14px',
                        marginTop: '14px',
                        width: '80%',
                        marginLeft: '50px'
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
                View
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
                  Upcoming: Feb 25, 7 PM - Purok 1 VS Purok 6
                </Typography>
                <Typography variant="body1">
                  Past: Feb 8, 5 PM - SK VS Purok 2
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5">Event Announcements</Typography>
                <Typography variant="body1">
                  May 15, 2023 One-day League Tournament
                </Typography>
                <Typography variant="body1">
                  May 14, 2023 3-Point Contest
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                View
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