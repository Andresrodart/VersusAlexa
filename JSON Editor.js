{
    "interactionModel": {
        "languageModel": {
            "invocationName": "te reto",
            "intents": [
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": []
                },
                {
                    "name": "HelloWorldIntent",
                    "slots": [],
                    "samples": [
                        "hello",
                        "how are you",
                        "say hi world",
                        "say hi",
                        "hi",
                        "say hello world",
                        "say hello"
                    ]
                },
                {
                    "name": "AMAZON.NavigateHomeIntent",
                    "samples": []
                },
                {
                    "name": "RetoIntent",
                    "slots": [
                        {
                            "name": "nivel",
                            "type": "NivelDeEducacion",
                            "samples": [
                                "para {nivel}",
                                "de {nivel}",
                                "{nivel}"
                            ]
                        },
                        {
                            "name": "tema",
                            "type": "TemasEducativos",
                            "samples": [
                                "Con {tema}",
                                "Pon {tema}",
                                "Quiero {tema}"
                            ]
                        }
                    ],
                    "samples": [
                        "Preguntame {tema} nivel {nivel}",
                        "Preguntame de {tema} nivel {nivel} "
                    ]
                },
                {
                    "name": "AprendeIntent",
                    "slots": [
                        {
                            "name": "tema",
                            "type": "TemasEducativos",
                            "samples": [
                                "vamos con {tema}",
                                "me interesa {tema}",
                                "quiero saber de {tema}",
                                "{tema}"
                            ]
                        },
                        {
                            "name": "nivel",
                            "type": "NivelDeEducacion",
                            "samples": [
                                "de {nivel}",
                                "Quiero {nivel}",
                                "{nivel}",
                                "Si para {nivel}"
                            ]
                        }
                    ],
                    "samples": [
                        "{nivel} de {tema}",
                        "{tema}",
                        "Quiero saber de {nivel} {tema}",
                        "Quiero saber {tema} de {nivel}",
                        "Quiero saber de {tema}",
                        "Lección de {tema} de {nivel}"
                    ]
                }
            ],
            "types": [
                {
                    "name": "NivelDeEducacion",
                    "values": [
                        {
                            "name": {
                                "value": "preparatoria",
                                "synonyms": [
                                    "avanzado"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "secundaria",
                                "synonyms": [
                                    "intermedio"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "primaria",
                                "synonyms": [
                                    "primaria",
                                    "basico"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "TemasEducativos",
                    "values": [
                        {
                            "id": "Matematicas",
                            "name": {
                                "value": "Matemáticas",
                                "synonyms": [
                                    "matematicas",
                                    "Matemáticas",
                                    "Mate",
                                    "Mates"
                                ]
                            }
                        },
                        {
                            "id": "HistoriaDeMexico",
                            "name": {
                                "value": "Historia de México",
                                "synonyms": [
                                    "Historia de México",
                                    "Historia"
                                ]
                            }
                        },
                        {
                            "id": "Geografia",
                            "name": {
                                "value": "Geografía",
                                "synonyms": [
                                    "Gio",
                                    "Geo"
                                ]
                            }
                        }
                    ]
                },
                {
                    "name": "Continuar",
                    "values": [
                        {
                            "id": "siguiente",
                            "name": {
                                "value": "Si",
                                "synonyms": [
                                    "vamos",
                                    "dale",
                                    "va",
                                    "Sí",
                                    "si"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        "dialog": {
            "intents": [
                {
                    "name": "AprendeIntent",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "tema",
                            "type": "TemasEducativos",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1345493251342.440061461454"
                            }
                        },
                        {
                            "name": "nivel",
                            "type": "NivelDeEducacion",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.185495927227.394135100489"
                            }
                        }
                    ]
                },
                {
                    "name": "RetoIntent",
                    "confirmationRequired": false,
                    "prompts": {},
                    "slots": [
                        {
                            "name": "nivel",
                            "type": "NivelDeEducacion",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.846214191380.1391378279011"
                            }
                        },
                        {
                            "name": "tema",
                            "type": "TemasEducativos",
                            "confirmationRequired": false,
                            "elicitationRequired": true,
                            "prompts": {
                                "elicitation": "Elicit.Slot.1507142329407.1161676709889"
                            }
                        }
                    ]
                }
            ],
            "delegationStrategy": "ALWAYS"
        },
        "prompts": [
            {
                "id": "Confirm.Intent.1505626694112",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Falta que me digas un tema"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1345493251342.440061461454",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Te hace falta que me digas un tema, ¿cuál tema vas a legir papá?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.1507142329407.1161676709889",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Oye, no tan rapido ¿con qué tema quieres empezar?"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.185495927227.394135100489",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "No me has dicho un nivel carnal, ¿vienes truchas como para primaria o secundaria?"
                    }
                ]
            },
            {
                "id": "Confirm.Slot.44586463393.1168650882148",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Perdona, no te entedí. Mejor sólo dime primaria o secundaria"
                    }
                ]
            },
            {
                "id": "Confirm.Intent.154942556435",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "Te faltó algo amigo"
                    }
                ]
            },
            {
                "id": "Elicit.Slot.846214191380.1391378279011",
                "variations": [
                    {
                        "type": "PlainText",
                        "value": "¿Y de que nivel estaos hablando?"
                    }
                ]
            }
        ]
    }
}