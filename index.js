// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
var informacion; //= require('./somefile.json')
var teacher = null;
const Aprender = require('./aprenderHandler.js')
const Alexa = require('ask-sdk-core');
const WelcomeDialogs = ['¿Estás aquí para retarme, o estas aquí para recibir lecciones de la maestra Alexa?', '¿Acaso tu Kunfu es más fuerte, o quieres entrenar?', 'Vaya, veo que hay un retador entre nosotros, ¿estas listo o necesitas ayuda?'];
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = WelcomeDialogs[Math.floor(Math.random() * WelcomeDialogs.length)];
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const AprendeIntent = {
    canHandle(handlerInput){
        return  handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AprendeIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        let myResponse = "Houston hubo un problema";
                var tema = request.intent.slots.tema.resolutions.resolutionsPerAuthority[0].values[0].value.id;
                var nivel = request.intent.slots.nivel.resolutions.resolutionsPerAuthority[0].values[0].value.name;
                informacion = require(`./nivel/${nivel}.json`);
                teacher = new Aprender(nivel, tema, informacion);
                myResponse = teacher.maquinaDeEstados();
        return handlerInput.responseBuilder
            .speak(myResponse)
            .reprompt('Si quieres continuar con otra pregunta di continuar o no continuar')
            .getResponse();
    }
}

const ContinuarIntent = {
    canHandle(handlerInput){
        return  handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'ContinuarIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        let myResponse = 'Houston tenemos un problema';
       if(teacher !== null){
            var Qcontinuar = request.intent.slots.continuar.resolutions.resolutionsPerAuthority[0].values[0].value.id;
            myResponse = toString(Qcontinuar);
       }else{
           //Sigue preguntando
       }
        return handlerInput.responseBuilder
            .speak(myResponse)
            .reprompt(myResponse)
            .getResponse();
    }
}

const RetoIntent = {
    canHandle(handlerInput){
        return  handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'RetoIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        //var tema = request.intent.slots.tema.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        //var nivel = request.intent.slots.nivel.resolutions.resolutionsPerAuthority[0].values[0].value.name;

        return handlerInput.responseBuilder
            .speak('aqui me retas')
            .reprompt('aqui me retas')
            .getResponse();
    }
}


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speechText = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        AprendeIntent,
        RetoIntent,
        ContinuarIntent,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
