import React, {useState} from 'react'


const Searchbar = () => {

 const [searchInput, setSearchInput] = useState("");

 const contents = [

  { name: "Players" },
  { name: "Teams"},
  { name: "Schedule" },
  { name: "Announcements" },
  { name: "EventDisplay" }
 
];

const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
};

if (searchInput.length > 0) {
    contents.filter((content) => {
    return content.contents.match (searchInput);
});
}

return (
    <div className='search-container'>
        <div>
        <input
          type="search"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput} />
        </div>
    </div>
    )

};

export default Searchbar;