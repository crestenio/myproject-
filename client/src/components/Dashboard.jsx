import React, { useState } from "react";
import Sidebar from '../components/Sidebar';
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

  return (
    <>
    <Sidebar/>
    <div className={classes.root}>
      <div className={classes.accountSection}>
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
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </Popover>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5">Total Teams Submitted</Typography>
                <Typography variant="body1">{teamsSubmitted}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5">Past and Upcoming Schedule</Typography>
                <Typography variant="body1">
                  Upcoming: Feb 10, 7 PM - Lakers vs Clippers
                </Typography>
                <Typography variant="body1">
                  Past: Feb 8, 5 PM - Warriors vs Suns
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                Learn More
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
                  Feb 12, All-Star Game at the Staples Center
                </Typography>
                <Typography variant="body1">
                  Feb 15, Free throw competition at the Lakers practice facility
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
    </>
  );
};

export default BasketballSystemDashboard;