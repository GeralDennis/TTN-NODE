// collector.js
// connects to personal TTN feed using Node.js SDK
// stores data in mongodb database
// Author - Nic Burkinshaw nic@thinnovation.co.uk

var express = require("express");

// MQTT setup
var mqtt = require('mqtt');
var options = {
    port: 1883,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: '	lorawan-pico@ttn',
    password: 'NNSXS.RYEECZRKJKHANK5EZN3SK23373IUQWLRML23AYY.FFTSCJ7JBUDVPNEZTKIBB6RCXEQNVEG3JCQHHER4UPJ2ALVZOHGQ',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('https://nam1.cloud.thethings.network',options);

// Global variable to save data
//var globalMQTT = 0;

// MQTT setup
client.on('connect', function() {
    console.log('Client connected to TTN')
    client.subscribe('#')
});

client.on('error', function(err) {
    console.log(err);
});

client.on('message', function(topic, message) {
    var getDataFromTTN = JSON.parse(message);
    console.log("Data from TTN: ", getDataFromTTN.uplink_message.decoded_payload);
    var messageObject = getDataFromTTN.uplink_message.decoded_payload;
    //globalMQTT = Buffer.from(getFrmPayload, 'base64').toString();
});

const { insertDocument } = require('./mongo.js');

insertDocument(messageObject)


function exitHandler(options, err) {
    if (err) {
        console.error('Application exiting...', err);
    }
    process.exit();
}

process.on('exit', exitHandler.bind(null, { cleanup: true }));
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));