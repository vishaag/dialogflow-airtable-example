var Airtable = require('airtable');

var attractionsBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_ATTRACTIONS_ID);

var express = require('express');
var expressApp = express();

var bodyParser = require('body-parser');
expressApp.use(bodyParser.json());

// Import action-on-google for google assistant UI components
// If you want to integrate with other apps such as slack or facebook, use the dialogflow-fulfilment library instead
// -> https://www.npmjs.com/package/dialogflow-fulfillment
const {
  dialogflow,
  BasicCard,
  BrowseCarousel,
  BrowseCarouselItem,
  Button,
  Carousel,
  Image,
  LinkOutSuggestion,
  List,
  MediaObject,
  Suggestions,
  SimpleResponse,
  Table,
 } = require('actions-on-google');

// Create an app instance
const app = dialogflow()


// Default Welcome Intent
app.intent('Default Welcome Intent', conv => {
    conv.ask(new SimpleResponse({text: 'Hi! Ask me about attractions at Changi! :)', speech: 'Hi! Ask me about attractions at Changi!'}))
});


// If user inputs location, return it, otherwise return T2 by default
const resolveLocation = function(location) {
  if(location == '') {
    return 'T2'
  } else {
    return location 
  }
}

//Get Attractions Data from Airtable
const getAttractionsData = async (location) => {
    try {
        return await attractionsBase('Attractions').select({
          maxRecords: 7,
          view: "Grid view",
          filterByFormula: "{Location} ='"+location+"'"
        }).all();
    }
    catch(err) {
        console.error(err);
        return; 
    }
};

// Attractions Intent
app.intent('Attractions', async (conv, params) => {
  var location = resolveLocation(params['airport-location'])
  var myResponse = await getAttractionsData(location)
  var attractionsArray = []
  for (var i=0; i<myResponse.length; ++i) {
    attractionsArray.push({
      name: myResponse[i].get('Name'),
      location : myResponse[i].get('Location'),
      address : myResponse[i].get('Address'),
      timing : myResponse[i].get('Timings'),
      accessibleTo: myResponse[i].get('AccessibleTo'),
      imageURL: myResponse[i].get('Image')
    });
  }
  
  var carouselItems = {
    items: {}
  }
  
  for(i=0; i<attractionsArray.length; ++i) {
    carouselItems.items[attractionsArray[i].name] = {
      title: attractionsArray[i].name,
      description: attractionsArray[i].address,
      image: new Image({
        url: attractionsArray[i].imageURL,
        alt: 'Image of' + attractionsArray[i].name,
      }),
      
    }
  }
      
  var carouselObject = new Carousel(carouselItems);   
  
  conv.ask(new SimpleResponse({text: 'Here are a few popular attractions near '+location, speech: 'Here are a few popular attractions near '+location}))
  conv.ask(carouselObject)
})


// Default Fallback Intent
app.intent('Default Fallback Intent', conv => {
  conv.ask('I did not understand. Can you tell me something else?')
})

// POST Endpoint for dialogflow
expressApp.post("/", app)

// expressApp.get("/", function(request, response) {});

var listener = expressApp.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
