# Readme

This project is built using [Create-React-App](https://github.com/facebook/create-react-app). It is essentially just pre-configured Webpack. The docs cover most uses cases, eg if you want to add SASS check the docs.

## Development
_____
Run the app with a dev server. Should auto open in a new browser window, if not root should be http://localhost:3000 (will report in console). Has live-reload.

Run: `npm start`

## Build / Compile
_____
This will create a simple static HTML/CSS site in '/build'. It is what gets deployed on the server to users.

Run: `npm run build`

## Testing
_____
This project uses [Flow](https://flow.org/) for type checking. I (think) it has Jest installed too.  

## React - Subdomains
_____
Domain build is deployed to must be specified in package.json. This is important for linking to local assets properly (eg CSS files). 
```
{
  "homepage": "http://example/learn"
}
```

## Firebase
_____
Firebase stores user data. 

## Translations
_____
All text written in this app should link to the text file, it lives at `./src/config/text.js`

## Routing
_____
Lives in `./src/router/routes.js`, and is handled by React-Router v4. [Their docs are decent](https://reacttraining.com/react-router/web/guides/philosophy)
