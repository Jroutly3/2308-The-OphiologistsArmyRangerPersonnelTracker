// Creates the list of personnel when the user types something in the search bar
import React from "react";
import Card from '../../components/Card';

function SearchList({filteredPersons}) {
    const filtered = filteredPersons.map(person =>  <Card key={person.id} person={person} />);
    
    return (
        <div>
          {filtered}
        </div>
      );
}

export default SearchList;