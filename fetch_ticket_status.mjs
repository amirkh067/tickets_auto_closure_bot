//this code fetch the ticket status for tickets fetched by db_fetch from tools like Service Now/ Maximo/ For me etc..
// and save the information in outputFilePath mentioned in line 14
import fs from 'fs';
import moment from 'moment';
import { parseString } from 'xml2js';
import fetch from 'node-fetch';
import https from 'https';
import http from 'http';

// Specify the file path from which to read ticket numbers
const inputFilePath = '/Path/to/file/file.txt';

// Specify the file path where you want to write the output
const outputFilePath = '/Path/to/file/ticketsinfo.txt';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const alertsOptions = {
  hostname: 'IP',
  port: port,
  path: 'your_restapi?ticketid=', // check it with postman i have tested for maximo and restapi to fetch ticketstatus provided by maximo
  // is  https://ip_or_hostname/maxrest/rest/os/MXINCIFACE/?ticketid=12345533
  headers: {
    //'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from('username:password').toString('base64')
  }
};

const fetchAlerts = async (ticketNumber) => {
  try {
    const alertsRes = await fetch(`https://${alertsOptions.hostname}${alertsOptions.path}${ticketNumber}`, {
      method: 'GET',
      headers: alertsOptions.headers
    });

    console.log(`Fetching ticket number: ${ticketNumber}`);
    console.log('Alerts response status code:', alertsRes.status);
    console.log('Alerts response headers:', alertsRes.headers.raw());

    const data = await alertsRes.text();
    console.log('Raw XML data:', data);

    parseString(data, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        return;
      }

      const ticketInfo = result;
      console.log('Ticket information:', ticketInfo);

      // Write the ticket information to the output file
      fs.appendFileSync(outputFilePath, JSON.stringify(ticketInfo) + '\n');
    });
  } catch (error) {
    console.error(error);
  }
};

const processTicketNumbers = () => {
  try {
    const ticketNumbers = fs.readFileSync(inputFilePath, 'utf-8').split('\n');

    for (const ticketNumber of ticketNumbers) {
      if (ticketNumber.trim() !== '') {
        fetchAlerts(ticketNumber.trim());
      }
    }
  } catch (error) {
    console.error('Error reading input file:', error);
  }
};

processTicketNumbers();
