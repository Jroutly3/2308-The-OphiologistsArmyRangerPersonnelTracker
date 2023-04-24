// Creates the search page in the app
import React, {useState} from "react";
import Scroll from "../components/SearchFunctions/Scroll";
import SearchList from "../components/SearchFunctions/SearchList";
import initialDetails from '../data/initialDetails';
import Card from "../components/Card";

function Search({details = initialDetails.initialDetails}) {

    const [searchField, setSearchField] = useState("");
    const [searchShow, setSearchShow] = useState(false); 

    //Creates the initial card that shows the values of each column
    const testperson = {
      "id": 0,
      "unit": "Company",
      "name": "Name",
      "DODID": "DODID",
      "Rank": "Rank",
      "ssn": "ssn",
      "Birthdate": "Birthdate",
      "Address": "Address",
      "Status": "Status"
    };

   
    // Basic search function
    const filteredPersons = details.filter(
        person => {
            return (
                person.name.toLowerCase().includes(searchField.toLowerCase())  ||
                person.unit.toLowerCase().includes(searchField.toLowerCase())
            );
        }
    );

    //Changes what to show in the search based on the input
    const handleChange = e => {
        setSearchField(e.target.value);
        if(e.target.value===""){
          setSearchShow(false);
        }
        else {
          setSearchShow(true);
        }
    };

    //Creates the list of users and the description bar
    function searchList() {
      if (searchShow) {
        return(
            <Scroll style={{paddingLeft: 10}}>
                <Card key={testperson.id} person = {testperson}/>
                <SearchList filteredPersons={filteredPersons}/>
            </Scroll>
        );
      }
    }

    //Basic styling
    var letterStyle = {
      padding: 10,
      marginLeft: 5,
      justifyContent:'center',
      alignItems:'center',
      display: 'flex',
    }

    //More basic styling
    var backGround = {
      backgroundColor: '#EBF7F5'
    }

    //Displays the page and lets the above functions work together for the search function 
    return (
        <section className="garamond" style={backGround}>
          <div className="navy georgia ma0 grow" style={letterStyle}>
            <h2 className="f2">Personnel Search</h2>
          </div>
          <div className="pa2">
            <input 
              className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
              type = "search" 
              placeholder = "Search People" 
              onChange = {handleChange}
              style={letterStyle}
            />
            
          </div>
          
          {searchList()}
          <div style={{padding: 350}}></div>
        </section>
      );
}

export default Search;
