# library-app
node v18.16.0

How to use the app: 
1. Clone the repo and install all of the dependencies in frontend and backend folder "npm i"
2. Create a .env file in the backend folder and inside of it put this:
   PORT=4000
   MOBGO_URI=here put link of your mongo db database it should look like this (mongodb+srv://name:password@cluster78.sduefst.mongodb.net/) "without the ()"
   `i excluded this file in the github repo for security reasons`
3. Cd into the backend folder and in terminal type "npm run dev"
4. Open up another terminal and cd into frotnend folder and type "npm start"
5. To run the tests just open another terminal and cd into the backend folder and type "npm test"

If you have any problems running the app make sure that your mongodb database link looks like one i porvided above and make sure you're using the 
node version i also provided above.

To change node version use node version manager (nvm) https://github.com/nvm-sh/nvm
