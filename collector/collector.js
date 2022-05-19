// collector.js
// connects to personal TTN feed using Node.js SDK
// stores data in mongodb database
// Author - Nic Burkinshaw nic@thinnovation.co.uk
const { insertDocument } = require('./mongo.js');
var express = require("express");

var messageObject = {
        "EC_soil": 1500,
        "PH_soil": 7,
        "env_humidity": 50,
        "env_temperature": 24.1,
        "mois_soil": 2,
        "temp_soil": 30.1
      }
insertDocument(messageObject)



