const generateJWT = require('./jwt/jwtGenerator');
const auth = require('./middleware/auth')
const client = require('./databasepg.js');
const express = require('express');
const bcrypt = require ('bcrypt');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
client.connect();
const  PORT = 8000

app.use(express.json()); //req.body
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(cors());
app.use(bodyParser.json()); 



// get queries

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
app.get('/teams', (req, res)=>{
    client.query(`Select * from teams Inner Join players On teams.team_id = players.player_id`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
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

app.get('/submission', (req, res)=>{
    client.query(`Select * from submission`, (err, result)=>{
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

app.get('/teams/:team_id', (req, res)=>{
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

app.post('/teams', (req, res)=> {
    const teamName = req.body ["team_name"]
    const noOfPlayers = req.body["no_of_players"]
    const teamManager = req.body["team_manager"]
    const userID = req.body["user_id"]

    const insertQuery = `INSERT INTO teams (team_name, no_of_players, team_manager, user_id) VALUES ('${teamName}', '${noOfPlayers}', '${teamManager}', '${userID}');`
    
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
    const teamNames = req.body ["team_names"]
    const Venue = req.body["venue"]
    const dateTime = req.body["date_time"]
    const userID = req.body["user_id"]
    const teamID = req.body["team_id"]

    const insertQuery = `INSERT INTO schedule (team_names, venue, date_time, user_id, team_id) VALUES ('${teamNames}', '${Venue}', '${dateTime}', '${userID}', '${teamID}');`
    
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

app.post('/submission', (req, res)=> {
    const teamname = req.body ["team_name"]
    const Players = req.body["no_of_players"]
    const teammanager = req.body["team_manager"]
    const userID = req.body["user_id"]
    const teamID = req.body["team_id"]

    const insertQuery = `INSERT INTO submission (team_name, no_of_players, team_manager, user_id, team_id) VALUES ('${teamname}', '${Players}', '${teammanager}', '${userID}', '${teamID}');`
    
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

app.put('/teams/:team_id', (req, res)=> {
    let team = req.body;
    let updateQuery = `update teams
                       set team_name = '${team.team_name}',
                       no_of_players = '${team.no_of_players}',
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
                       set team_names = '${schedule.team_names}',
                       venue = '${schedule.venue}',
                       date_time = '${schedule.date_time}'
                       where schedule_id = ${schedule.schedule_id}`

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

//Routes Login Register Page//

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
        INSERT INTO users (firstname, lastname, username, password)
        VALUES ($1, $2, $3, $4) RETURNING *
        `, [firstname, lastname, username, bcryptPassword])

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
            console.log('Login')
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
        res.json({
            token
        })

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


app.listen(PORT, ()=>{
    console.log("Server is now listening at port 8000");
})

/////