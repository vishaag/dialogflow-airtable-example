# Dialogflow-Airtable Example
An example to demonstrate how you can use Airtable as the database for a dialogflow chatbot. The example chatbot can respond
with the different Attractions in Changi Airport based on the airport location. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Although if you want this to work with Google Assistant, you would have to deploy it on a live system or use a tool like ngrok to expose your local web server. 
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Dialogflow Setup
   1. Create an account or login in to [Dialogflow](https://dialogflow.com) and create a new agent with the name ```Changi-Attractions```
   2. Click on the agent settings (gear icon) and go to ```Export and Import``` tab and click on ```Import from ZIP```
   3. Select the ```Changi-Attractions.zip``` (in the Dialogflow folder) and import it into dialogflow
   4. Explore the the ```intents``` and ```entities``` tab
   
2. Create an account in Airtable and create a new workspace. Click on ```Add a base``` and ```import a spreadsheet```, import the .csv file (in the database folder) and name it ```Changi```.
3. Open the created base and you can see the sheet name as ```Imported table```. Change it to ```Attractions```.
3. Retrieve API keys from Airtable
   1. Account API key: 
   go to (https://airtable.com/account) and find your airtable account API key
   2. Database key: 
   go to (https://airtable.com/api) and select 'Changi' and find your base API key
4. Save these API keys as we would need them in the .env file later
   

### Installing

```
npm install
touch .env
```
* Now, open the .env file and paste the following
```
# Your Airtable API key. It'll look like key123asdf123asdf
AIRTABLE_API_KEY=

# Your newly created base ID. It'll look like app123asdf123asdf
AIRTABLE_ATTRACTIONS_ID=
```
* Paste the API keys we copied earlier into their respective places and save the file

## Running on local
```
node server.js
```
```
# if you want to set breakpoints and inspect the code
node --inspect server.js
```
You can now send POST requests to this server to debug and test how the code works. Although if you need to use it
with Google Assistant, you will need to deploy it on a live system.

## Deployment

Option 1. Install a tunneling software like ngrok (https://ngrok.com/) to get a public URL for your localhost.

Option 2. A better option would be to deploy it on a real live server. One of the easiest way to do this would be
deploying it on glitch.  
1. Make an account or login to [glitch](http://glitch.me)
2. Go to [this glitch link](https://glitch.com/edit/#!/gaudy-coral) and click on 'Remix to edit' so that you can clone this 
project to your account
3. Follow the install section of this document and paste the API keys in the .env file in glitch. Note that the .env file is already present in glitch by default and you don't need to create a new one.
4. Get your live glitch link (by clicking on Show -> In a new window) and paste it into the the Webhook URL 
in your Dialowflow Agent Fulfulment Tab (instead of the ```https://gaudy-coral.glitch.me/```). The Dialogflow agent will now
use your server on glitch as the backend. Make sure to save your changes.

## Using it on Google Assistant

1.  In the right hand side of your Dialogflow agent page, you can find a a test area. Click on 'See how it works in Google Assistant'
This will open the google assistant console.
2.  Click on 'Talk to my app' in the chatbot simulator to start chatting with your Changi Attractions Bot.
You can ask the following phrases : 
```
attractions near me
attrations near T2
attractions near terminal1
attractions near jewel
things to see in t2
```
Explore the Attraction intent in your Dialogflow agent to find what other phrases you can ask. You can also add more training phrases. Make sure you
tag the 'airport-location' entity if you want to filter based on location.


## Links
* [Glitch Project](https://glitch.com/edit/#!/gaudy-coral) - Example application running on glitch
* [Glitch](http://glitch.me) - Glitch website
* [Airtable](https://airtable.com) - Airtable website
* [Dialogflow](https://dialogflow.com) - Dialogflow website

