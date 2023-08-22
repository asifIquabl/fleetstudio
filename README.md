# fleetstudio - assesment
# clone the project/code from Git Hub using any of the following any of the following step

## Set up project using clone command
# Step 1- open the git bash or terimnal to clone the project /code into the local system
# step 2- use the command to clone - git clone https://github.com/asifIquabl/fleetstudio.git

## Set up project by downloading the folder from git hub as zip.
# step 1- Download the as zip - https://github.com/asifIquabl/fleetstudio
# setp 2- Unzip the folder and navidate to the poject folder.

## After completeing the project set up, follow the below steps to run the file 
# setp1- Navigate to the project folder and install the node_modules packages using npm install
# Note: make sure the system installed with node and npm.
# step2- start the server using the command npm run start.

## After starting the server - Try testing the following API Routes
# Note: Make sure, you use the public repository 
# Route 1 - /repositories/:owner/:repository/commits/:commitId
# Example - http://localhost:3000/repositories/asifIquabl/fleetstudio/commits/b691a37abdc6081734902f6c55a43900473a80a7
# Rote2 - /repositories/:owner/:repository/commits/:base...:head/diff
# Example - http://localhost:3000/repositories/asifIquabl/fleetstudio/commits/b691a37abdc6081734902f6c55a43900473a80a7...75ec684a55660c427c528d861ab6db6a05670b92/diff




# Created api routes to get the commit 
# Created api routes to get the diff in commit 
# how to use API routes
# Note Only public Git Hub Repo can be accessed

