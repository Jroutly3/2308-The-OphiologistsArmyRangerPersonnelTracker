import React, {useState} from "react";
import initialDetails from '../data/initialDetails';
import Scroll from "../components/SearchFunctions/Scroll";
import SearchList from "../components/SearchFunctions/SearchList";
import Card from "../components/Card";
//import flask_server from "../../flask_server.py"
  
const Sort = () => {
  const [sortField, setsortField] = useState("");
   const [sortShow, setsortShow] = useState(false); 

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
  var sorted = initialDetails.initialDetails;
  //console.log(sorted)
  function sayHello() {
    sorted.sort((a,b) => a.unit - b.unit);
    setsortField(true);
    //console.log(sorted)
  }
  function sortName() {
    sorted.sort((a,b) => a.DODID - b.DODID);
    setsortField(false);
    //console.log(sorted)
  }
  function totalSort() {
    return (
      <Scroll>
        <Card key={testperson.id} person = {testperson}/>
        <SearchList filteredPersons={sorted}/>
    </Scroll>
    )
  }
  return (
    <section className="garamond">
          <div className="navy georgia ma0 grow">
            <h2 className="f2">Personnel Sort</h2>
          </div>
          <button onClick={sayHello}>Sort by Company</button>
          <button onClick={sortName}>Sort by DODID</button>
          {totalSort()}
        </section>
  );
};
  
export default Sort;