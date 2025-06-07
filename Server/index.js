const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 8093;
const fs = require("fs");
const { MessagingResponse } = require("twilio").twiml;
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "familpps_ashish",
    password: "Ashish@123",
    database: "familpps_root_picnic",
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "alex_event",
});

// Function to execute database queries
const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(query, values, (err, results) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    });
};
// POST request for sending messages

app.post("/api/send-sms", async (req, res) => {
    const { to, from, body, id } = req.body;

    // Replace these with your Twilio credentials
    const accountSid = "AC450154e8d2737cf678f5fafab8520d6d";
    const authToken = "f4c78cd387e582622e0516a65aeda9d0";

    const client = require("twilio")(accountSid, authToken);

    client.messages
        .create({
            body: body,
            from: from,
            to: to,
        })
        .then(async (message) => {
            const query = `
          UPDATE user_data
          SET texttouser = JSON_SET(
              IFNULL(texttouser, '{"msg": "", "count": 0}'),
              '$.msg',
              ?,
              '$.count',
              IFNULL(JSON_UNQUOTE(JSON_EXTRACT(texttouser, '$.count')), 0) + 1
          )
          WHERE id = ?;
      `;
            const values = [body, id];
            const log = "Message details updated";

            await saveData(req, res, query, values, log);
            res.json({ messageSid: message.sid });
            console.log("Message sent and DB updated;");
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

// Function to handle saving data in a generic way
const saveData = async (req, res, query, values, log) => {
    try {
        console.log("Connected to the database");
        await executeQuery(query, values);
        console.log(log);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500); // Send an error response and return to exit the function
    }
};

// POST route to save SVG data
app.post("/api/save", async (req, res) => {
    const data = req.body;
    const { questionaire, selected_option, type } = data;

    try {
        // Convert questionaire to JSON string if it's an object
        const questionaireJSON =
            typeof questionaire === "object"
                ? JSON.stringify(questionaire)
                : questionaire;

        const query1 = `INSERT INTO user_data (questionaire, selected_option, type, updationtime) VALUES (?, ?, ?, ?)`;
        const values1 = [questionaireJSON, selected_option, type, new Date()];

        await executeQuery(query1, values1);
        console.log("Data Inserted successfully !!");

        return res.status(200).send("Entry updated");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error saving data");
    }
});

app.post("/api/saveespolon", async (req, res) => {
    const data = req.body;
    const { email, first_name, last_name, birth_date, zip_code } = data;

    try {
       

        const query1 = `INSERT INTO espolon_data (email, first_name, last_name, birth_date, zip_code, updationtime) VALUES (?, ?, ?, ?, ?, ?)`;
        const values1 = [email, first_name, last_name, birth_date, zip_code, new Date()];

        await executeQuery(query1, values1);
        console.log("Data Inserted successfully !!");

        return res.status(200).send("Entry updated");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error saving data");
    }
});

// GET route to fetch data
app.get("/api/fetchdb", async (req, res) => {
    try {
        const query = `SELECT * FROM user_data`;
        const result = await executeQuery(query, []);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.get("/api/fetchdbespolon", async (req, res) => {
    try {
        const query = `SELECT * FROM espolon_data`;
        const result = await executeQuery(query, []);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.post("/api/savestatus", async (req, res) => {
    try {
        const data = req.body;
        const { type, status, id } = data;
        // type has two values status and status_text = sms text
        const query = `UPDATE user_data SET ${type} = ? WHERE id = ?`;
        const values = [status, id];
        console.log("Savestatus API - saving data", data);
        await executeQuery(query, values);
        res.send("Status updated");
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
// GET route to fetch inventory data
app.get("/api/fetchinventory", async (req, res) => {
    const { type } = req.query;
    let params = [];
    try {
        let query = "SELECT * FROM inventory_list";
        if (type) {
            query += " WHERE item_name = ?";
            params.push(type);
        }
        const result = await executeQuery(query, params);

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.post("/api/updateinventory", async (req, res) => {
    try {
        const data = req.body;
        const { avlitems, iv } = data;
        // type has two values status and status_text = sms text
        const query = `UPDATE inventory_list SET available_items = ? WHERE iv = ?`;
        const values = [avlitems, iv];
        console.log("updateinventory API - Updating Inventory", data);
        await executeQuery(query, values);
        res.send("Status updated");
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.get("/", (req, res) => {
    res.send("Hey, it's Root Picnic");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
