//Creates the sort page in the app
import React, {useState} from "react";
import initialDetails from '../data/initialDetails';
import Scroll from "../components/SearchFunctions/Scroll";
import SearchList from "../components/SearchFunctions/SearchList";
import Card from "../components/Card";
  
const Sort = () => {
  const [sortField, setsortField] = useState(false);
   const [sortShow, setsortShow] = useState(false); 

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

  //Sets our array to a variable then sorts the array depending on the button pressed
  var sorted = initialDetails.initialDetails;
  function sayHello() {
    sorted.sort((a,b) => a.unit - b.unit);
    if (sortField === false) {
      setsortField(true);
    } else {
      setsortField(false);
    }
  }
  function sortName() {
    sorted.sort((a,b) => a.DODID - b.DODID);
    if (sortShow === false) {
      setsortShow(true);
    } else {
      setsortShow(false);
    }
  }

  //Returns the sorted list in the cards
  function totalSort() {
    return (
      <Scroll>
        <Card key={testperson.id} person = {testperson}/>
        <SearchList filteredPersons={sorted}/>
    </Scroll>
    )
  }

  //Styling
  var letterStyle = {
    padding: 10,
    justifyContent:'center',
    alignItems:'center',
    display: 'flex',
  }

  //Returns the page with the sorted list along with the two buttons that will sort by company of DODID
  return (
    <section className="garamond">
          <div className="navy georgia ma0 grow" style={letterStyle}>
            <h2 className="f2">Personnel Sort</h2>
          </div>
          <button onClick={sayHello} style={{marginLeft:65}}>Sort by Company</button>
          <button onClick={sortName}>Sort by DODID</button>
          {totalSort()}
          <div style={{padding: 30}}></div>
        </section>
  );
};
  
export default Sort;