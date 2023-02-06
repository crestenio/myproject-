import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AddPlayers from "./AddPlayers";


const Players = () => {
  const [player, setPlayer] = useState([{ id: 1, firstname: "", lastname: "", middlename: "", gender: "",Age: "", birthday: "", address: "", phone: "" }]);
  const [showForm, setShowForm] = useState(false);
  
  const handleCreateButtonClick = () => {
    setShowForm(true);
  };
  const handleAddPlayer = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleModifyPlayer = (index) => {
    // Code to handle modify team action
  };

  const handleDeletePlayer = (index) => {
    const newPlayer = [...Players];
    newPlayer.splice(index, 1);
    setPlayer(newPlayer);
  };

  return (
    <>
    <Sidebar/>
    <div className="team-container">
        <h2>Add players</h2>
         
      <button className="player-btn" onClick={handleCreateButtonClick }>Add</button>
      <hr />
      {showForm && <AddForm/>}(
        <div className="player-form">
          {/* Code for the form to add a team */}
          <button onClick={handleCloseForm}>Close</button>
        </div>
      )
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Middle Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Birthday</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Players.map((Players, index) => (
            <tr key={Players.id}>
              
              <td>{Players.firstname}</td>
              <td>{Players.lastname}</td>
              <td>{Players.middlename}</td>
              <td>{Players.gender}</td>
              <td>{Players.age}</td>
              <td>{Players.bithday}</td>
              <td>{Players.address}</td>
              <td>{Players.phone}</td>
              <td>
                <button onClick={() => handleModifyTeam(index)}>Modify</button>
                <button onClick={() => handleDeleteTeam(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Players;