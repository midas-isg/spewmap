# spewmap
SPEW Map: Synthetic Populations and Ecosystems of the World (SPEW) Viewer on world map
## Required 
- MongoDB and Data. See [spewmap-etl](https://github.com/midas-isg/spewmap-etl)
- tiles servers


## Deployment
### Required tools for deployment
- git
- maven
- JDK version 8+
### Clone
`git clone https://github.com/midas-isg/spewmap`

### Configuration
Copy the application.properties.template file as application.properties:

`
cp config/application.properties.template config/application.properties
`

Edit the config/application.properties to the proper settings.


### Start the service
`./start.sh`