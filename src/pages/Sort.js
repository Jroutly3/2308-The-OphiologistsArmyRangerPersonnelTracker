import React from "react";
import initialDetails from '../data/initialDetails';
import Scroll from "../components/SearchFunctions/Scroll";
import SearchList from "../components/SearchFunctions/SearchList";
  
const Sort = () => {
  return (
    <Scroll>
        <SearchList filteredPersons={initialDetails.initialDetails}/>
    </Scroll>
  );
};
  
export default Sort;