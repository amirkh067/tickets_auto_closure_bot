import fetch from 'node-fetch';
import https from 'https';
import http from 'http';
import fs from 'fs';
import moment from 'moment';
// Assuming you have the response object containing rowset with ticket numbers
const response = { rowset: { rows: [/* ... */] } };

// Specify the file path where you want to write the ticket numbers
const filePath = '/Path/to/file/file.txt';

let lastsysdate = '';
try {
  lastsysdate = fs.readFileSync('lastsysdate.txt', 'utf8').trim();
  lastsysdate = new Date(Date.parse(lastFirstOccurrence));
} catch (err) {
  console.error(err);
}



  const epochTime = lastsysdate instanceof Date ? lastsysdate.getTime()/1000 : 'getdate%28%29-300';
  const filter = lastsysdate instanceof Date ? `sysdate%20%3E%20${epochTime}` : 'sysdate%20%3E%20getdate%28%29-300';
  console.log('Epoch Time:', epochTime);
  console.log('Filter:', filter);



function encodeSQLToHTML(sqlQuery) {
  let encodedQuery = encodeURIComponent(sqlQuery)
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\!/g, '%21')
    .replace(/\'/g, '%27')
    .replace(/\~/g, '%7E')
    .replace(/\*/g, '%2A')
    .replace(/\//g, '%2F')
    .replace(/\:/g, '%3A')
    .replace(/\=/g, '%3D')
    .replace(/\?/g, '%3F')
    .replace(/\%20/g, '%20');

  return encodedQuery;
}
let sqlQuery = `ticketid != '' and Severtity != 0`; //write your sql query here
let encodedQuery = encodeSQLToHTML(sqlQuery);
console.log(encodedQuery);

const alertsOptions = {
  hostname: '158.98.136.121',
  port: 8080,
  path: `yourrestapi?filter=${encodedQuery}AND%20${filter}%20ORDER%20BY%20sysdate%20ASC`, //your db sysdate in unix epoch time format
  method: 'GET',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from('username:password').toString('base64')
  }
};
console.log(alertsOptions.path);


  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Make the HTTP GET request to fetch the alerts
  const alertsReq = http.request(alertsOptions, (alertsRes) => {
    console.log('Alerts response status code:', alertsRes.statusCode);
    console.log('Alerts response headers:', alertsRes.headers);

    let data = '';

    // Concatenate the response data as it comes in
    alertsRes.on('data', (chunk) => {
      data += chunk;
    });

    alertsRes.on('end', () => {
    // Parse the response as a JSON object
    const response = JSON.parse(data);
    const ticketNumbers = response.rowset.rows.map(row => row.TicketNumber);
    // Write the ticket numbers to the text file
    fs.writeFile(filePath, ticketNumbers.join('\n'), (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
      } else {
        console.log('Ticket numbers written to the text file.');
      }
    });


      // Loop through the response and extract the relevant information for each alert
      for (let i = 0; i < response.rowset.rows.length; i++) {
        // replace column with your own column name
        const column = response.rowset.rows[i].column;
        const column = response.rowset.rows[i].column;
        const column = response.rowset.rows[i].column;
        const column = response.rowset.rows[i].column;
        const column = response.rowset.rows[i].column;
        const sysdate = response.rowset.rows[i].sysdate;
        const sysdate = moment(sysdate * 1000).format('DD MMM YYYY HH:mm:ss Z'); //convert epoch timestamp to human readable format
        const column = response.rowset.rows[i].column;
        const column = response.rowset.rows[i].column;


       if (i === response.rowset.rows.length - 1) {
          lastsysdate = new Date(sysdate * 1000); // multiply by 1000 to convert from seconds to milliseconds
          console.log('lastsysdate is:', lastsysdate);
        
          // Write the value to a text file
          fs.writeFile('lastsysdate.txt', lastsysdate.toString(), function (err) {
            if (err) throw err;
            console.log('lastsysdate.txt has been saved.');
          });
        }

    }
  });
});

// Handle errors for the alerts request
alertsReq.on('error', (error) => {
  console.error(error);
});
//}
alertsReq.end();
//fetchAlerts();
