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
Here are some sample GET requests:

* http://\<host\>:3000/odata/Customers?$expand=contacts
* http://\<host\>:3000/odata/$metadata
* http://\<host\>:3000/odata/People

## Authentication and Authorization
n-odata-server leverages the authentication and authorization mechanisms supplied by loopback. 
We have provided a [wiki page](https://github.com/htammen/n-odata-server/wiki/authorization) to help you get started easily with this topic.

## Docker
It's also quite easy to run the application in a Docker container. This might be a good idea if you e.g. don't have a
local node.js installation yet. To create a Docker container after pulling the github repo to your local pc just enter
the following commands in a terminal window.

* `cd <folder of your git workspace>`
* `docker build -t node-odata-server-example .` depending on if you already downloaded the node docker image or not this may take a while
* `docker run -it -p 3000:3000 --name my-running-nodata-server node-odata-server-example`

Then you can acces the application in your browser by entering:
`http://<host of your Docker VM>:3000/`
You should now see the simple Homepage of the application

To get the ip address of your Docker VM just enter `docker-machine ls` and pull out the ip address of the URL column of the machine default.
E.g.:
```
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER    ERRORS
bluemix   -        virtualbox   Running   tcp://192.168.99.102:2376           v1.10.0
default   *        virtualbox   Running   tcp://192.168.99.100:2376           v1.10.0
```
