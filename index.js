
const express = require('express');

const app = express();

const db = require('./db');


app.get('/', async (req, res) => {
    res.send("Działa");
})


app.get('/listAll', async (req, res) => {
    res.write("<h1>Lista wszystkich rekordów w bazie</h1>");
    const client = await db.connect();
    res.write("<table>");
    let list = await db.getAllListings(client);
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url + "</td>");
        res.write("<td>" + element.name + "</td>");
        res.write("</tr>");
    });
    res.write("</table>");
    db.close(client);
    res.end();
})

//yds
app.listen(8000);