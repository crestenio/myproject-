CREATE TABLE standings (standing_id serial PRIMARY KEY, team_name VARCHAR(50) NOT NULL, wins int NOT NULL, losses int NOT NULL, 
					 team_id integer REFERENCES teams(team_id) ON DELETE CASCADE);
			
			
INSERT INTO standings ("team_name", "wins", "losses", "team_id") VALUES('Purok 2', '4', '3', '10');

select * from standings