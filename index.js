	// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
	// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
	// session persistence, api calls, and more.
	var informacion; //= require('./somefile.json')
	var teacher = null;
	var respuestaCorrecta = null;
	var explicacion = null;
	var explicacionFinal = [];
	var contador = 0;
	var preguntasCorrectas = 0;
	var temaPregunta = null;
	var temaNivel = null;
	const Aprender = require('./aprenderHandler.js');
	const myDocument = require('./main.json');
	const Alexa = require('ask-sdk-core');
	const WelcomeDialogs = ['¿Estás aquí para retarme, o estas aquí para recibir lecciones de la maestra Alexa?', '¿Acaso tu Kunfu es más fuerte, o quieres entrenar?', 'Vaya, veo que hay un retador entre nosotros, ¿estas listo o necesitas ayuda?'];
	const TestDialogs = ["Vaya, esa estuvo difícil, pero las que siguen son peor", "Mira, no te preocupes por esta, tú sigue", "El que nada sabe nada teme, continua igual"];
	const LaunchRequestHandler = {
		canHandle(handlerInput) {
			return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
		},
		handle(handlerInput) {
			const speechText = WelcomeDialogs[Math.floor(Math.random() * WelcomeDialogs.length)];
			return handlerInput.responseBuilder
				.speak(speechText)
				.reprompt(speechText)
				.addDirective({
					type: 'Alexa.Presentation.APL.RenderDocument',
					token: '[SkillProvidedToken]',
					version: '1.0',
					document: myDocument,
					datasources: {}
				})
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
			let myImg = "https://s3.amazonaws.com/nutricioninteligente/screen1.png";
			let myResponse = "Houston hubo un problema";
					var tema = request.intent.slots.tema.resolutions.resolutionsPerAuthority[0].values[0].value.id;
					var nivel = request.intent.slots.nivel.resolutions.resolutionsPerAuthority[0].values[0].value.id;
					informacion = require(`./nivel/${nivel}.json`);
					teacher = new Aprender(nivel, tema, informacion);
					myResponse = teacher.maquinaDeEstados();
			if(tema === 'Matematicas')
				myImg = "https://4.bp.blogspot.com/-ZIXB-sB1oGQ/WyhWHEXS_dI/AAAAAAAAWEQ/YFaaAFmYy18VfroS59Ha0B4IUJL232xiACLcBGAs/s1600/mejores%2Bcanales%2Byoutube%2Bmatematicas.jpg"
			else if(tema === 'Geografia')
				myImg = "https://i.pinimg.com/originals/52/83/4f/52834f21d1c9b62f0ef83244a4830b07.png";
			else
				myImg = "http://sesgo.org/images/benito-juarez-portada.jpg";
			return handlerInput.responseBuilder
				.speak(myResponse)
				.reprompt('Quieres saber un poco más de información di continuar o no continuar')
				.addDirective({
					type: 'Alexa.Presentation.APL.RenderDocument',
					version: '1.0',
					document: require('./help.json'),
					datasources: {
						"bodyTemplate7Data": {
							"type": "object",
							"objectId": "bt7Sample",
							"title": tema,
							"image": {
								"sources": [
								{
									"url": myImg,
									"size": "small",
									"widthPixels": 0,
									"heightPixels": 0
								},
								{
									"url": myImg,
									"size": "large",
									"widthPixels": 0,
									"heightPixels": 0
								}
								]
							},
							"logoUrl": "",
							"hintText": "Try, \"Continuar\""
						}
					}
				})
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
			let Qcontinuar = request.intent.slots.continuar.value;
			let myResponse = 'Hosuton no hicimos nada';
			let myImg = '';
		if(teacher !== null){
			if (Qcontinuar.toLowerCase() === 'continuar') {
					teacher.estado = 'continuar';
					myResponse = teacher.maquinaDeEstados();
				}else{
					teacher = null;
					myResponse = 'Muy bien padawan hemos terminado por hoy';
					return handlerInput.responseBuilder
						.speak(myResponse)
						.reprompt('¿Quieres jugar o retarme?')
						.addDirective({
							type: 'Alexa.Presentation.APL.RenderDocument',
							token: '[SkillProvidedToken]',
							version: '1.0',
							document: myDocument,
							datasources: {}
						})
						.getResponse();
				}
		}else{
				myResponse = 'Aun no tenemos nada pausado para continuar';
		}
			if(teacher.tema === 'Matematicas')
				myImg = "https://4.bp.blogspot.com/-ZIXB-sB1oGQ/WyhWHEXS_dI/AAAAAAAAWEQ/YFaaAFmYy18VfroS59Ha0B4IUJL232xiACLcBGAs/s1600/mejores%2Bcanales%2Byoutube%2Bmatematicas.jpg"
			else if(teacher.tema === 'Geografia')
				myImg = "https://i.pinimg.com/originals/52/83/4f/52834f21d1c9b62f0ef83244a4830b07.png";
			else
				myImg = "http://sesgo.org/images/benito-juarez-portada.jpg";

			return handlerInput.responseBuilder
				.speak(myResponse)
				.reprompt(myResponse)
				.addDirective({
					type: 'Alexa.Presentation.APL.RenderDocument',
					version: '1.0',
					document: require('./help.json'),
					datasources: {
						"bodyTemplate7Data": {
							"type": "object",
							"objectId": "bt7Sample",
							"title": teacher.tema,
							"image": {
								"sources": [
								{
									"url": myImg,
									"size": "small",
									"widthPixels": 0,
									"heightPixels": 0
								},
								{
									"url": myImg,
									"size": "large",
									"widthPixels": 0,
									"heightPixels": 0
								}
								]
							},
							"logoUrl": "",
							"hintText": "Try, \"Continuar\""
						}
					}
				})
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
			contador = 0;
			explicacionFinal = [];
			preguntasCorrectas = 0;
			temaPregunta = request.intent.slots.tema.resolutions.resolutionsPerAuthority[0].values[0].value.id;
			temaNivel = request.intent.slots.nivel.resolutions.resolutionsPerAuthority[0].values[0].value.id;
			
			var informacion = require(`./nivel/${temaNivel}.json`);
			var randomTema = Math.floor(Math.random() * 3 );
			var randomPregunta = Math.floor(Math.random() * 3 );
			
			var pregunta = informacion[temaPregunta][randomTema].preguntasrespuestaexpliacion[randomPregunta][0];
			explicacion = informacion[temaPregunta][randomTema].preguntasrespuestaexpliacion[randomPregunta][2];
			respuestaCorrecta = informacion[temaPregunta][randomTema].preguntasrespuestaexpliacion[randomPregunta][1];
			
			var texto = "";
			
			switch(temaPregunta){
				case "Matematicas":
				texto = "Uuuy las Matemáticas son algo difíciles, pero está bien, confio en ti";
				break;
				
				case "Geografia":
				texto = "Espero que no nos perdamos dentro del Universo"
				break;
				
				case "Historia":
				texto = "Bien, es hora de viajar en el tiempo"
				break;
				
				default:
				break;
			}
			
			contador += 1;
			return handlerInput.responseBuilder
				.speak(`<speak>${texto} <break time="1s"/> ${pregunta}</speak>`)
				.reprompt('Espero una mejor respuesta')
				.getResponse();
		}
	}

	const RespuestaMatematicasPrimariaIntent = {
		canHandle(handlerInput) {
			return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'RespuestaMatematicasPrimariaIntent';
		},
		handle(handlerInput) {
			if(contador == 0){
				return handlerInput.responseBuilder
					.speak('Epa epa ¿eso que quiere decir? ¿Quieres entrenar o retarme?')
					.reprompt('¿Quieres entrenar o retarme?')
					.getResponse();
			}
			const request = handlerInput.requestEnvelope.request;
			let meEquivoque = '';
			let sino
			try {
				sino = request.intent.slots.sino.resolutions.resolutionsPerAuthority[0].values[0].value.id;
			} catch (error) {
				sino = null;
			}
			let myResponse = 'Incorrecto';
			let number = request.intent.slots.number.value;
			if(sino && sino === respuestaCorrecta)
				myResponse = 'Correcto';
			if(number && number === respuestaCorrecta){
				myResponse = 'Correcto';
				meEquivoque = 'Violento y con Tokio papá';
			}
			if (myResponse === 'Incorrecto'){
				explicacionFinal.push(explicacion);
				meEquivoque = explicacion;
			}
			else
				preguntasCorrectas++;
			
			if(contador == 6){
				let explicaciones = ''
				for (let index = 0; index < explicacionFinal.length; index++)
					explicaciones += `<p>${explicacionFinal[index]}. </p>`
				contador = 0;
				explicacionFinal = [];
				preguntasCorrectas = 0;
				return handlerInput.responseBuilder
				.speak(`<speak> Hemos terminado. Has tenido ${preguntasCorrectas} respuestas correctas. Ahora te diré en que puede mejorar ${explicaciones}</speak>`)
				.reprompt('continuan las pregutntas')
				.getResponse();
			}
			var informacion = require(`./nivel/${temaNivel}.json`);

			var randomTema = Math.floor(Math.random() * 3 );
			var randomPregunta = Math.floor(Math.random() * 3 );

			var pregunta = informacion[temaPregunta][randomTema].preguntasrespuestaexpliacion[randomPregunta][0];
			respuestaCorrecta = informacion[temaPregunta][randomTema].preguntasrespuestaexpliacion[randomPregunta][1];
			explicacion = informacion[temaPregunta][randomTema].preguntasrespuestaexpliacion[randomPregunta][2];
			contador++;
			return handlerInput.responseBuilder
				.speak(`<speak> ${meEquivoque}. Siguiente pregunta ${pregunta} </speak>`)
				.reprompt('Espero una merjo respuesta')
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
			RespuestaMatematicasPrimariaIntent,
			CancelAndStopIntentHandler,
			SessionEndedRequestHandler,
			IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
		.addErrorHandlers(
			ErrorHandler)
		.lambda();
