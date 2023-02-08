import React from "react";
import initialDetails from '../data/initialDetails';
import Scroll from "../components/SearchFunctions/Scroll";
import SearchList from "../components/SearchFunctions/SearchList";
import Card from "../components/Card";
  
const Sort = () => {
  const testperson = {
    "id": 0,
    "unit": "Company",
    "name": "Name",
    "location": "Location",
    "DODID": "DODID"
  }
  
  return (
    <Scroll>
        <Card key={testperson.id} person = {testperson}/>
        <SearchList filteredPersons={initialDetails.initialDetails}/>
    </Scroll>
  );
};
  
export default Sort;