# Army Ranger Personnel Tracker
This project provides a database to hold the information and documents of soldiers in a consolidated and secure fashion. This database can be searched and sorted by multiple criteria pertaining to soldiers, such as rank, company, or name. This function is provided through a secured frontend with login functionality, including account restrictions on what data can be accessed and edited based on the role and rank of the user logged in.

# Release Notes

## Version 0.2.0
### Features:

 - Added multifield sorting and searching to database procedures
 
 - Connected frontend to backend, database queries can be run from UI

 - Created server intermediary between UI and database, restricts database access to provided procedures

### Bug Fixes

 - Search bar modified to no longer not show results if results are set to be permanently visible

 - Table view modified such that data shown in table is no longer unaligned due to length differences of input strings

 ### Known Issues
 
 - Server intermediary currently does not allow connections outside of host
 - The front end does not properly align sorted data

## Version 0.1.0

### Features:

-   Added tables for holding basic soldier information, relative data, documents, and accounts
    
-   Added sorting and searching functions based on name, id, and company
    
-   Created basic frontend mockup

### Bug Fixes

N/A




