# Contribution to whitelistRest

## Add a new resource

### Create a new table for this resource

- Create a sequelize table definition in a new file in `src/models`
- Create a new service file in `src/services` containing all the methods to interract with your table
- If some data is sensible, create a filter method in the service file which only keeps the data not sensible
- Add the documentation for this data in a new file in `src/swagger/model`. The data must correspond to what will be exchanged in the http requests (ie, only the data kept by the filter)

### Create new routes to interact with this resource

Routes:

- Create a new controller file in `src/controllers` containing the new controller methods. These methods must only use service methods.
- Create new filters in `src/filters` if required
- Create a new router in `src/routes` containing the new routes (which points towards filters and controller methods)
- Use this router in `src/routes.js`

Documentation:

- If filters were added, add their description and message content in a new file in `src/swagger/filter`
- Add the controllers documentation in a new file in `src/swagger/controller`
  - Add all path parameters (example in `src/swagger/controller/emailSwagger : deleteEmailSwagger`)
  - Add the body specifications if needed (example in `src/swagger/controller/registerSwagger`)
  - Add all possible response (example in `src/swagger/controller/userSwagger: setParamSwagger`)
  - Remember to use utilSwagger methods and to import messages from the controller and filters to avoid duplicate code
  - Remember to use the previously defined filter and model swagger documentation
- Assign these controller docs to their route in a new route file in `src/swagger/route`
- Add these route docs to the main swagger route doc file `src/swagger/routerSwagger`
