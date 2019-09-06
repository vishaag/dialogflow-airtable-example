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

* Open the .env file and paste the following

```
# Your Airtable API key. It'll look like key123asdf123asdf
AIRTABLE_API_KEY=

# Your newly created base ID. It'll look like app123asdf123asdf
AIRTABLE_ATTRACTIONS_ID=
```
* Paste the API keys we copied earlier into their respective places and save the file

## Deployment

* Get your live glitch link (by clicking on Show -> In a new window) and paste it into the the Webhook URL 
in your Dialowflow Agent Fulfulment Tab (instead of the ```https://gaudy-coral.glitch.me/```). The Dialogflow agent will now
use your server on glitch as the backend. Make sure to save your changes.

## Using it on Google Assistant

1.  In the right hand side of your Dialogflow agent page, you can find a a test area. Click on ```See how it works in Google Assistant```
This will open the google assistant console.
2.  Click on ```Talk to my app``` in the chatbot simulator to start chatting with your Changi Attractions Bot.
You can ask the following phrases : 
```
attractions near me
attrations near T2
attractions near terminal1
attractions near jewel
things to see in t2
```
Explore the Attraction intent in your Dialogflow agent to find what other phrases you can ask. You can also add more training phrases. Make sure you
tag the ```airport-location``` entity if you want to filter based on location.

### Demo
💃💃💃 Talk to the bot! 🕺🕺🕺


## Links
* [Github Link](https://github.com/vishaag/dialogflow-airtable-example) - Project Github page
* [Glitch Project](https://glitch.com/edit/#!/gaudy-coral) - Example application running on glitch
* [Glitch](http://glitch.me) - Glitch website
* [Airtable](https://airtable.com) - Airtable website
* [Dialogflow](https://dialogflow.com) - Dialogflow website