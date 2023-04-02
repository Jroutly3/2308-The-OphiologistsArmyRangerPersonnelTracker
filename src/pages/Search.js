import React, {useState} from "react";
import Scroll from "../components/SearchFunctions/Scroll";
import SearchList from "../components/SearchFunctions/SearchList";
import initialDetails from '../data/initialDetails';
import Card from "../components/Card";



function Search({details = initialDetails.initialDetails}) {
  //console.log(initialDetails);
  //console.log(details)
    const [searchField, setSearchField] = useState("");
    const [searchShow, setSearchShow] = useState(false); 

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

   

    const filteredPersons = details.filter(
        person => {
            return (
                person.name.toLowerCase().includes(searchField.toLowerCase())  ||
                person.unit.toLowerCase().includes(searchField.toLowerCase())
            );
        }
    );
    const handleChange = e => {
        setSearchField(e.target.value);
        if(e.target.value===""){
          setSearchShow(false);
        }
        else {
          setSearchShow(true);
        }
    };

    function searchList() {
      if (searchShow) {
        return(
            <Scroll>
                <Card key={testperson.id} person = {testperson}/>
                <SearchList filteredPersons={filteredPersons}/>
            </Scroll>
        );
      }
    }

    var letterStyle = {
      padding: 10,
      justifyContent:'center',
      alignItems:'center',
      display: 'flex',
    }

    var backGround = {
      backgroundColor: '#EBF7F5'
    }

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
          <div style={{padding: 250}}></div>
        </section>
      );
}

export default Search;

/*
const testperson = {
      "id": 0,
      "unit": "Company",
      "name": "Name",
      "location": "Location",
      "DODID": "DODID"
    }
    <Card key={testperson.id} person = {testperson}/>
    
    
     var letterStyle = {
      padding: 10,
      margin: 10,
      display: "inline-block",
      fontFamily: "monospace",
      fontSize: 24,
      textAlign: "center"
  };*/
