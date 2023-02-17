const express = require('express');
const bcrypt = require ('bcrypt');
const cors = require('cors');
const bodyParser = require("body-parser");
const generateJWT = require('./jwt/jwtGenerator');
const auth = require('./middleware/auth')
const client = require('./databasepg.js');


const app = express();
client.connect();
const  PORT = 8000

app.use(express.json()); //req.body
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(cors());
app.use(bodyParser.json()); 


//Routes Login Register Page Query//

app.post('/Signup', async (req, res) => {
    try {

        //take the username and password from the req.body
        const {
            firstname,
            lastname,
            username,
            password
            
        } = req.body

        //Check if the user is already exist

        const user = await client.query(`SELECT * FROM users WHERE
        username = $1`, [username])

        if (user.rows.length > 0) {
            res.status(401).send("User already exists")
        }

        //Setup Bcrypt for password hashing

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        //Add the new user into the database
        //generate the uuid using the uuidv4() function
        const newUser = await client.query(`
        INSERT INTO users (firstname, lastname, username, password, role)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
        `, [firstname, lastname, username, bcryptPassword, "user"])

        //generate and return the JWT token
        const token = generateJWT(newUser.rows[0])

        res.json({ token })
        
    } catch (error) {

        console.log(error.message)
        res.status(500).send(error.message)
    }

})

app.post('/Login', async (req, res) => {
    try {
            // console.log('Login')
        //take the username and password from the req.body
        const {
            username,
            password
        } = req.body

        //Check if the user is not existing
        const user = await client.query(`SELECT * FROM users WHERE
        username = $1`, [username])
        console.log(user);

        if (user.rows.length < 1) {
            console.log("user found")
            console.log(user.rows[0])
            return res.json('User does not exists')
        }
        else{
            console.log('with user')
            console.log(user.rows[0])
            const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword) {
            return res.json('Password incorrect')
        }
        }

        //generate and return the JWT
        const token = generateJWT(user.rows[0])

        const data = {
            token,
            user_id: user.rows[0].user_id,
            username: user.rows[0].username,
            role: user.rows[0].role,
        
            
        }
        res.json(data)

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }
})

//provide the auth middleware
app.get('/verify', auth, async (req, res) => {
    try {

        //return the user object
        res.json(req.user)
    } catch (error) {
        console.error(err.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }
})

//loginend//


// get queries

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/events', (req, res)=>{
    client.query(`Select * from events`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.get('/teams1', (req, res)=>{
    client.query(`SELECT teams.*,COUNT(teams.team_id) AS numOfPlayers FROM teams INNER JOIN players ON players.team_id = teams.team_id
                    GROUP BY teams.team_id`, (err, result)=>{
        if(!err){ 
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/teams2', (req, res)=>{
    client.query(`SELECT * from teams`, (err, result)=>{
        if(!err){ 
            res.send(result.rows);
        }
    });
    client.end;
})

// get the total counts of team submitted
app.get('/count-teams1', async (req, res) => {
    try {
        const count = await client.query('SELECT COUNT(team_id) FROM teams');
        res.json(count.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/players', (req, res)=>{
    client.query(`Select * from players`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/schedule', (req, res)=>{
    client.query(`Select * from schedule`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/submission1', (req, res)=>{
    client.query(`SELECT teams.*,COUNT(teams.team_id) AS numOfPlayers FROM teams INNER JOIN players ON players.team_id = teams.team_id
                    GROUP BY teams.team_id`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/submission2', (req, res)=>{
    client.query(`Select * from submission`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/standings', (req, res)=>{
    client.query(`Select * from standings`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})



//get queries via ID

app.get('/users/:user_id', (req, res)=>{
    client.query(`Select * from users where user_id=${req.params.user_id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/events/:event_id',  (req, res)=>{
    client.query(`Select * from events where event_id=${req.params.event_id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/teams/:team_id',  (req, res)=>{
    client.query(`Select * from teams where team_id=${req.params.team_id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/players/:player_id', (req, res)=>{
    client.query(`Select * from players where player_id=${req.params.player_id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
            console.log(result.rows)
        }
    });
    client.end;
})

app.get('/team/players/:team_id', (req, res)=>{
    client.query(`Select * from players where team_id=${req.params.team_id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/schedule/:schedule_id', (req, res)=>{
    client.query(`Select * from schedule where schedule_id=${req.params.schedule_id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/submission/:submission_id', (req, res)=>{
    client.query(`Select * from submission where submission_id=${req.params.submission_id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/standings/:standing_id', (req, res)=>{
    client.query(`Select * from standings where standing_id=${req.params.standing_id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

// Add queries
app.post('/users', (req, res)=> {
    const firstname = req.body ["firstname"]
    const lastname = req.body["lastname"]
    const username = req.body["username"]
    const password = req.body["password"]
    const confirm_password = req.body["confirm_password"]

    const insertQuery = `INSERT INTO users (firstname, lastname, username, password, confirm_password) VALUES ('${firstname}', '${lastname}', '${username}', '${password}', '${confirm_password}');`
    
    client.query(insertQuery) .then((response) =>{
        console.log("Data Saved")
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
    console.log(req.body);
    res.send("Response Received: " + req.body);
})
client.end;

app.post('/events', auth, (req, res)=> {
    const eventName = req.body ["eventName"]
    const eventDate = req.body["eventDate"]
    const eventVenue = req.body["eventVenue"]
    const userID = req.user["user_id"]

    const insertQuery = `INSERT INTO events (event_name, venue, date_time, user_id) VALUES ('${eventName}', '${eventVenue}', '${eventDate}', '${userID}');`
    console.log(userID)
    client.query(insertQuery) .then((response) =>{
        console.log("Data Saved")
        console.log(response)
    })
    .catch((err) => {
        console.log("1")
    })
    console.log(req.body);
    res.send("Response Received: " + req.body);
})
client.end;

app.post('/teams', auth, (req, res)=> {
    const teamName = req.body ["teamName"]
    const noOfPlayers = req.body["no_of_players"]
    const teamManager = req.body["teamManager"]
    const userID = req.user["user_id"]

    // console.log(teamName)
    // console.log(teamManager)

    const insertQuery = `INSERT INTO teams (team_name, no_of_players, team_manager, user_id) VALUES ('${teamName}', '${0}', '${teamManager}', '${userID}');`
    console.log(userID)
    client.query(insertQuery) .then((response) =>{
        console.log("Data Saved")
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
    console.log(req.body);
    res.send("Response Received: " + req.body);
})
client.end;

app.post('/players', (req, res)=> {
    const firstname = req.body ["firstname"]
    const lastname = req.body["lastname"]
    const middlename = req.body["middlename"]
    const gender = req.body["gender"]
    const age = req.body["age"]
    const birthday = req.body["birthday"]
    const address = req.body["address"]
    const phone = req.body["phone"]
    const teamID = req.body["team_id"]

    const insertQuery = `INSERT INTO players (firstname, lastname, middlename, gender, age, birthday, address, phone, team_id) VALUES ('${firstname}', '${lastname}', '${middlename}', '${gender}', '${age}', '${birthday}', '${address}', '${phone}', '${teamID}');`
    
    client.query(insertQuery) .then((response) =>{
        console.log("Data Saved")
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
    console.log(req.body);
    res.send("Response Received: " + req.body);
})
client.end;

app.post('/schedule', (req, res)=> {
    const scheduleData = req.body
    // const teamA = req.body ["teamA"]
    // const teamB = req.body ["teamB"]
    // const venue = req.body["venue"]
    // const dateTime = req.body["dateTime"]
    // const userID = req.body["user_id"]

    const insertQuery = `INSERT INTO schedule ("teamA", "teamB", "venue", "date_time", "user_id") VALUES ('${scheduleData.teamA}', '${scheduleData.teamB}', '${scheduleData.scheduleVenue}', '${scheduleData.scheduleDate}', '${scheduleData.user_id}');`
    //console.log(scheduleData.scheduleDate + "checking")
    client.query(insertQuery) .then((response) =>{
        console.log("Data Saved")
        console.log(response)
        console.log(req.body)
    })
    .catch((err) => {
        console.log(err)
    })
    console.log(req.body);
    res.send("Response Received: " + req.body);
})
client.end;

app.post('/submission', (req, res)=> {
    const teamname = req.body ["team_name"]
    const Players = req.body["no_of_players"]
    const teammanager = req.body["team_manager"]
    const userID = req.body["user_id"]

    const insertQuery = `INSERT INTO submission (team_name, no_of_players, team_manager, user_id) VALUES ('${teamname}', '${0}', '${teammanager}', '${userID}');`
    
    client.query(insertQuery) .then((response) =>{
        console.log("Data Saved")
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
    console.log(req.body);
    res.send("Response Received: " + req.body);
})
client.end;

app.post('/standings', (req, res)=> {
    const teamName = req.body ["team_name"]
    const wins = req.body["wins"]
    const losses = req.body["losses"]
    const teamID = req.body["team_id"]

    const insertQuery = `INSERT INTO standings ("team_name", "wins", "losses", "team_id") VALUES ('${teamName}', '${0}', '${0}', '${teamID}');`
    
    client.query(insertQuery) .then((response) =>{
        console.log("Data Saved")
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
    console.log(req.body);
    res.send("Response Received: " + req.body);
})
client.end;

// update users

app.put('/users/:user_id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set firstname = '${user.firstname}',
                       lastname = '${user.lastname}',
                       username = '${user.username}',
                       password = '${user.password}',
                       confirm_password = '${user.confirm_password}'
                       where user_id = ${user.user_id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/events/:event_id', (req, res)=> {
    let event = req.body;
    let updateQuery = `update events
                       set event_name = '${event.event_name}',
                       date_time = '${event.date_time}',
                       venue = '${event.venue}'
                       where event_id = ${event.event_id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/teams/:team_id', (req, res)=> {
    let team = req.body;
    let updateQuery = `update teams
                       set team_name = '${team.team_name}',
                       team_manager = '${team.team_manager}'
                       where team_id = ${team.team_id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.put('/players/:player_id', (req, res)=> {
    let player = req.body;
    let updateQuery = `update players
                       set firstname = '${player.firstname}',
                       lastname = '${player.lastname}',
                       middlename = '${player.middlename}',
                       gender = '${player.gender}',
                       age = '${player.age}',
                       birthday = '${player.birthday}',
                       address = '${player.address}',
                       phone = '${player.phone}'
                       where player_id = ${player.player_id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/schedule/:schedule_id', (req, res)=> {
    let schedule = req.body;
    let updateQuery = `update schedule
                       set "teamA" = '${schedule.teamA}',
                       "teamB" = '${schedule.teamB}',
                       "venue" = '${schedule.venue}',
                       "date_time" = '${schedule.date_time}'
                       where schedule_id = ${schedule.schedule_id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/standings/:standing_id', (req, res)=> {
    let standing = req.body;
    let updateQuery = `update standings
                       set "team_name" = '${standing.team_name}',
                       "wins" = '${standing.wins}',
                       "losses" = '${standing.losses}'
                       where standing_id = ${standing.standing_id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

//delete users

app.delete('/users/:user_id', (req, res)=> {
    let insertQuery = `delete from users where user_id=${req.params.user_id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/events/:event_id', (req, res)=> {
    let insertQuery = `delete from events where event_id=${req.params.event_id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.delete('/teams/:team_id', (req, res)=> {
    let insertQuery = `delete from teams where team_id=${req.params.team_id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/players/:player_id', (req, res)=> {
    let insertQuery = `delete from players where player_id=${req.params.player_id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/schedule/:schedule_id', (req, res)=> {
    let insertQuery = `delete from schedule where schedule_id=${req.params.schedule_id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/submission/:submission_id', (req, res)=> {
    let insertQuery = `delete from submission where submission_id=${req.params.submission_id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/standings/:standing_id', (req, res)=> {
    let insertQuery = `delete from standings where standing_id=${req.params.standing_id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.listen(PORT, ()=>{
    console.log("Server is now listening at port 8000");
})

/////