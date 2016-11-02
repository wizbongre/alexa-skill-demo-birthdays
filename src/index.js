'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = "amzn1.ask.skill.a29357d4-7f98-4812-bfe4-6ade6ec49865";

var languageStrings = {
    "en-GB": {
        "translation": {
            "FACTS": [
                "HCP stands for HANA Cloud Platform",
                "HCP is an in-memory Platform as a service offering from SAP",
                "With HCP, you can build, extend and run applications on SAP HANA in the cloud",
                "You have flexible subscription models to purchase HCP",
                "With an HCP account, you can access optional services for apps, databases and infrastructure",
                "Using HCP for your apps gives you instant access to the power of SAP HANA",
                "You can create innovate, consumer grade applications using app services",
                "You can extend both cloud and on-premise applications using HCP",
                "As well as apps, HCP includes support for integration, security, analytics, mobile, portal and collaboration scenarios",
                "If you only want a HANA database, you can use the SAP HANA DB Services through HCP",
                "You can configure your HANA instance to have from 128Gb to 1Tb storage on HCP",
                "To make management easier, all config tasks are achieved through a cloud management console, run in your browser",
                "With HCP, you can build apps using Java, or HTML and JavaScript, or natively using HANA and XS",
                "The persistence layer on HCP allows you to build transactional, analytical, predictive and many other solution types",
                "For flexibility, you can purchase the combination of services and capabilities you need on your HCP account",
                "At the moment, all HCP accounts are hosted only in SAP's own datacentres",
                "You can use HCP to build on old SAP systems - you don't need S/4 HANA",
                "SAP HCP makes it easy to create solutions that integrate different platforms, such as Ariba, SuccessFactors and Hybris",
                "Your developers will gain access to a number of cloud based tools that enable development of HANA and UI5 apps",
                "Don't confuse HCP with HEC - SAP HANA Enterprise Cloud is an enterprise-class managed cloud offering"
            ],
            "SKILL_NAME" : "SAP HCP Facts",
            "GET_FACT_MESSAGE" : "Here's your fact: ",
            "HELP_MESSAGE" : "You can say tell me an HCP fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};