import React from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="header-content">

                <h1>BballPro</h1>
                <h2>“Manage your teams and events like a pro”</h2>
                <p>
                    A basketball management system <br /> that allows for the efficient organization <br />and management of basketball events, teams, and schedules.<br /> This system simplifies the process of creating and managing events,<br /> assigning teams to games, submitting and reviewing team rosters.

                </p>
                <a href='Signup'><button className="header-btn"
                >Register Now
                </button></a>

                <Grid container spacing={2} className="info-card-row">
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent style={{height: "200px"}}>
                                <Typography variant="h6">Upcoming Schedule</Typography>
                                <Typography variant="body1">Game 1 vs Team A - March 15, 2023</Typography>
                                <Typography variant="body1">Game 2 vs Team B - March 18, 2023</Typography>
                                <Typography variant="body1">Game 3 vs Team C - March 21, 2023</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent style={{height: "200px"}}>
                                <Typography variant="h6">Events</Typography>
                                <Typography variant="body1">Basketball clinic - March 25, 2023</Typography>
                                <Typography variant="body1">Basketball tournament - April 2-4, 2023</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent style={{height: "200px"}}>
                                <Typography variant="h6">Team Standings</Typography>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Team</th>
                                            <th>Wins</th>
                                            <th>Losses</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Team A</td>
                                            <td>5</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Team B</td>
                                            <td>4</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Team C</td>
                                            <td>3</td>
                                            <td>4</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
    )
}
export default Home;