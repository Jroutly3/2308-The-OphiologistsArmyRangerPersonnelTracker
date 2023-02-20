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
      "location": "Location",
      "DODID": "DODID"
    };

    const filteredPersons = details.filter(
        person => {
            return (
                person.name.toLowerCase().includes(searchField.toLowerCase()) ||
                person.location.toLowerCase().includes(searchField.toLowerCase()) ||
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

    return (
        <section className="garamond">
          <div className="navy georgia ma0 grow">
            <h2 className="f2">Personnel Search</h2>
          </div>
          <div className="pa2">
            <input 
              className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
              type = "search" 
              placeholder = "Search People" 
              onChange = {handleChange}
            />
            
          </div>
          
          {searchList()}
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
    <Card key={testperson.id} person = {testperson}/>*/
