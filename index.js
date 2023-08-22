const express = require("express");
const {get,isEmpty} = require("lodash");
const axios = require("axios");
//create express app
const app = express();

//port at which the server will run
const port = 3000;

//create end point
app.get("/", (request, response) => {
  //send 'Hi, from Node server' to client
  response.send("Hi, from Node server");
});
app.get("/repositories/:owner/:repository/commits/:commitId", async(request, response) => {
    try{
        const params = request.params;
        let config = {},validation=false,commitData={};
        validation = await validationparams(params,'get-commit')
        if(!validation) {
            response.status(400).json({
                error: 'invalid request or params missing',
            });
        }
        config = await prepareConfig(params,'get-commit')
        commitData = await axiosCall(config,'get-commit')        
        response.json(commitData);
    }
    catch(error){
        response.status(500).json({
            error: error.message,
          });
    }
  });
  app.get("/repositories/:owner/:repository/commits/:base...:head/diff", async(request, response) => {
    try{
        const params = request.params;
        let config = {},validation=false,commitDiffData={};
        validation = await validationparams(params,'get-commit-diff')
        if(!validation) {
            response.status(400).json({
                error: 'invalid request or params missing',
            });
        }
        config = await prepareConfig(params,'get-commit-diff')
        commitDiffData = await axiosCall(config,'get-commit')
        response.json(commitDiffData);
    }
    catch(error){
        response.status(500).json({
            error: error.message,
          });
    }
  });

//start server and listen for the request
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);

const axiosCall = async(config,requestName)=>{
    let result = {};
   try{
        await axios.request(config).then((response) => {
           console.log(response.data);
        result =  response.data;
    })
    .catch((error) => {
        result = error;
    });
    return result;
   }
   catch(error){
    return result;
   }
}

const validationparams = async(data,requestName)=>{
    let validataion = true;
    const owner = get(data.owner,'');
    const repository = get(data.repository,'');
    const commitId = get(data.commitId,'');
    const base = get(data.base,'');
    const head = get(data.head,'');
    if(requestName == 'get-commt') {
        if(isEmpty(owner) || isEmpty(repository) || isEmpty(commitId))
            validataion = false;
    }
    if(requestName == 'get-commt-diff') {
        if(isEmpty(owner) || isEmpty(repository) || isEmpty(base) || isEmpty(head))
            validataion = false;
    }
    return validataion; 
}
    
const prepareConfig = async(data,requestName)=>{
    let config = {};
    //git hub baseurl and basic req config
    const baseUrl = "https://api.github.com";
    const headers = {
        "Content-Type": "application/json"
    }

    config.method = 'GET';
    config.headers = headers
    //form API request url for get-commit 
    if(requestName == 'get-commit')
        config.url = `${baseUrl}/repos/${data.owner}/${data.repository}/commits/${data.commitId}`;
    //form API request url for get-diff in commit
    if(requestName == 'get-commit-diff')
        config.url = `${baseUrl}/repos/${data.owner}/${data.repository}/compare/${data.base}...${data.head}`;
    return config; 
}