# Chat Box
This is a simple application based on node to demo a simple web based chat application.
The application uses node with socket.io to help create the socket connection between the server and the clients

## How to run the application
Make sure you have the node installed on to your system. 
You can check check this by opening a command prompt or shell and type in the command "node --version" which will output the installed version of node.

Steps:
1. Download the code using git clone/ fork or a zip verision of code.<br/>
   Use the command -<strong> git clone https://github.com/rztiwari/chat-box.git </strong>
2. Go to the root directory of the project and run command - npm install. <br/> - This will download the node modules and install the required dependencies
3. Once the dependencies are installed cleanly run the command - npm start
4. This will start the application. <br/>You can access the application via url - localhost:3001
5. The applciation will start storing data on a local file users.txt.

## Running the mongo verison
To run the application via mongo database instead of file based open the file index.js and modify the LoginService to <br/>
 var LoginService = require('./service/login');<br/>
That's the only file change needed.
Make sure you have mongo installed locally. To test run the command mongod which should start the server.
Now you can run the application.

Steps:
1. Run the mongo server using command mongod on command prompt / shell
2. On a seperate command prompt/ shell, run the command - npm start
3. This will start the application. <br/>You can access the application via url - localhost:3001
4. The application will start storing the data on the local mongo instance.

## Caution
Since this a simple testing and play application, hence using actual credentials is strictly <strong>NOT RECOMMENDED</strong>
