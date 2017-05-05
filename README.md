# ReviewIT - an open-source tool for conducting systematic literature reviews

This tool runs in two primary docker containers: One for the ASP.NET core web API and one for the Angular front-end.

## Running the development environment

```
git clone https://github.com/Recensys/ReviewIT.git
cd reviewit
start ReviewIT-Backend.sln
```
press f5 to run the solution. It may take a while for it to run the first time around, as it bulls docker images and installs npm packages.

Navigate to localhost:5000

**notes on the angular app:** anything in Angular/src (the primary location of the angular app) is linked to the docker container running the app, so changes are automatically rebuilt and published on localhost:5000. Any changes outside of /src require a rebuild of the docker image. The easiest way is to rebuild the docker-compose project in Visual Studio.