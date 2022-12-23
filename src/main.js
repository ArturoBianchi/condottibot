const Client = require('./lib/Client.js');
const Deployer = require('./lib/Deployer.js');

let deployIsOk = Deployer.deployCommands();
if(deployIsOk){
    let clientInstance = new Client("commands", true);
    clientInstance.addInteractionEventsForCommands();
    clientInstance.doLogin();
}else{
    throw "Deploy Error";
}