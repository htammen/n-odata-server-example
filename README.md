# node_odata_server_example
#The node OData server for the loopback framework example project

This is an example project for the [n-odata-server](https://github.com/htammen/n-odata-server).
It assumes that you have cloned the n-odata-server loopback component from github into a local folder named
`n-odata-server` that is at the same hierarchy level as this project. If you cloned n-odata-server into another
directory adjust the file package.json in this directory accordingly.

After you cloned this repository and the n-odata-server repository
run `npm install`
and then `node .`
to start the application.

## Sample Data
### Create Sample Data
We have created a mechanism to produce the data you can work with from scratch. This is useful if you played around
with the data and it got out of control. To initialize the data just call the index page and follow the instructions there.

If you want to edit the data or add some data for initalization go to the folder `storage/sampledata`. There you find
some JSON files that you can edit. After you have edited a file go back to the initialize data link and initialize the data
of the table you altered there. You don't have to restart the server for that.

### Retrieve Sample Data
The index page also provides some links you can use to retrieve the data via the odata server.
To test the odata server we recommend to use a browser plugin e.g. Postman.
