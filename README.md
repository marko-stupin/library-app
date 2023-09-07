# library-app

node v18.17.1

## How to start the app

1. Clone the repo and install all of the dependencies in frontend and backend folder with `npm i`.

2. Cd into the backend folder and in terminal type `npm run dev`.

3. Open up another terminal and cd into frotnend folder and type `npm start`.

## How to run tests

### 1. Backend tests ( Jest )

- Run `npm test` in the terminal and make sure you are in the backend folder.

### 2. Frontend tests ( Selenium )

- Download and install <a href="https://www.mozilla.org/en-US/firefox/new/?redirect_source=firefox-com" target="_blank" >firefox</a> browser on your pc.
- Download `geckodriver.exe` from this <a href="https://www.npmjs.com/package/selenium-webdriver" target="_blank" >link</a> you will get a zip file.
- Go to your desktop and make a folder called `drivers` and put a content of the zip file you just downloaded insidie of it.
- Press the windows key on your keyboard and type `environment variables`.
- Click on `Edit environment variables for your account`.
- Create a new path under the user variables section and name it something and add a path to your drivers folder and pres ok.

  > to find out the path just right click on `drivers` folder open it up in terminal and type `pwd` and enter.

- Go back to vscode and run `npm test` in the terminal and make sure you are in the frontend folder.
- In order to see test report run `npm run report`.

> If you have any problems make sure that you're using the node version i provided above, to change your node version use <a href="https://github.com/coreybutler/nvm-windows target="\_blank" " >node version manager</a> (nvm).
