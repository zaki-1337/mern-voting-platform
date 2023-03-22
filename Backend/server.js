const express = require("express");
const cors = require("cors");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
client.connect();

let currentUsers = [];

const app = express();

app.use(cors());
app.use(express.json());

app.post("/app/signup", async (req, res) => {
  // console.log(req.body);
  try {
    // await client.connect();
    const db = client.db("project");
    const collection = db.collection("Main Collection");

    var myobj = req.body;
    myobj["Election Status"] = "Not Started";
    myobj["Results"] = 0; //Not Posted

    await collection.insertOne(myobj);
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
  res.sendStatus(200);
});

app.post("/app/adminlogin", async (req, res) => {
  // console.log(req.body);
  try {
    // await client.connect();
    const db = client.db("project");
    const collection = db.collection("Main Collection");

    var query = { Email: req.body.Email };

    const queryRes = await collection.find(query).toArray();

    if (queryRes === undefined || queryRes[0] === undefined) {
      // console.log("Not found");
      res.sendStatus(666);
    } else if (queryRes[0]?.Password === req.body.Password) res.sendStatus(200);
    else res.sendStatus(666);
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
});

app.post("/app/userlogin", async (req, res) => {
  try {
    // await client.connect();
    const db = client.db("project");
    let collection = db.collection("Main Collection");

    let queryRes = await collection.find().toArray();

    if (queryRes === undefined || queryRes[0] === undefined) {
      // console.log("Not found");
      res.sendStatus(666);
    } else if (queryRes[0]?.["Election Status"] === "Not Started")
      res.sendStatus(333);
    else if (queryRes[0]?.["Election Status"] === "Finished")
      res.sendStatus(335);
    else {
      var query = { "Voter Email": req.body.Email };
      collection = db.collection("Voters Collection");

      queryRes = await collection.find(query).toArray();

      if (queryRes === undefined || queryRes[0] === undefined) {
        // console.log("Not found");
        res.sendStatus(666);
      } else if (
        queryRes[0]?.["Voter Password"] === req.body.Password &&
        queryRes[0]?.["Voter Company"] === req.body.Company
      ) {
        if (queryRes[0]?.["Vote Casted"] === "Yes") res.sendStatus(982);
        else {
          res.sendStatus(200);
          currentUsers.push(req.body.Email);
        }
      } else res.sendStatus(666);
    }
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
});

/////// FILE UPLOAD
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "Files");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
});

let upload = multer({ dest: "Files/" });

app.post(
  "/app/insertfiles/voterData",
  upload.single("file"),
  async (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }

    // const nameTemp = file.originalname.split(".")[0];
    const objectTemp = excelToJson({
      sourceFile: `./Files/${file.filename}`,
      header: { rows: 1 },
      columnToKey: {
        "*": "{{columnHeader}}",
      },
    });

    // console.log(objectTemp[nameTemp]);

    try {
      // await client.connect();
      const db = client.db("project");
      const collection = db.collection("Voters Collection");

      await collection.insertMany(objectTemp["Sheet1"]);
    } catch (err) {
      throw err;
    } finally {
      // await client.close();
    }

    res.sendStatus(200);
  }
);

app.post(
  "/app/insertfiles/candidateData",
  upload.single("file"),
  async (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }

    // const nameTemp = file.originalname.split(".")[0];
    // console.log(nameTemp);
    const objectTemp = excelToJson({
      sourceFile: `./Files/${file.filename}`,
      header: { rows: 1 },
      columnToKey: {
        "*": "{{columnHeader}}",
      },
    });

    // console.log(objectTemp);
    // console.log(objectTemp["Sheet1"]);

    try {
      // await client.connect();
      const db = client.db("project");
      const collection = db.collection("Candidates Collection");

      await collection.insertMany(objectTemp["Sheet1"]);
    } catch (err) {
      throw err;
    } finally {
      // await client.close();
    }

    res.sendStatus(200);
  }
);
////////////////

app.post("/app/votingpage", async (req, res) => {
  try {
    // await client.connect();
    const db = client.db("project");
    const collection = db.collection("Candidates Collection");

    const result = await collection.find().toArray();

    res.send(result);
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
});

app.post("/app/votingpage/vote", async (req, res) => {
  try {
    // await client.connect();
    const db = client.db("project");
    let collection = db.collection("Candidates Collection");

    await collection.updateOne(
      { "Candidate Name": `${req.body.candidate}` },
      { $inc: { "Number of Votes": 1 } }
    );

    collection = db.collection("Voters Collection");
    await collection.updateOne(
      { "Voter Email": req.body.voter },
      { $set: { "Voted For": req.body.candidate, "Vote Casted": "Yes" } }
    );
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
  res.sendStatus(200);
});

app.post("/app/thankyou", async (req, res) => {
  try {
    // await client.connect();
    const db = client.db("project");
    const collection = db.collection("Voters Collection");

    const queryRes = await collection
      .find({ "Voter Email": req.body.voter })
      .toArray();

    const thankyouObj = {
      votedFor: queryRes[0]["Voted For"],
      nameVoter: queryRes[0]["Voter Name"],
    };
    res.send(thankyouObj);
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
});

app.post("/app/thankyou/gotoresults", async (req, res) => {
  try {
    // await client.connect();
    const db = client.db("project");
    const collection = db.collection("Main Collection");

    const queryRes = await collection.find().toArray();

    if (queryRes[0]?.["Results"] === 1) res.sendStatus(200);
    else res.sendStatus(999);
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
});

app.post("/app/votingcontrols", async (req, res) => {
  let voterCount = 0;
  let candidateCount = 0;

  try {
    // await client.connect();
    const db = client.db("project");
    let collection = db.collection("Voters Collection");

    let queryRes = await collection.find().toArray();
    voterCount = queryRes.length;

    collection = db.collection("Candidates Collection");
    queryRes = await collection.find().toArray();
    candidateCount = queryRes.length;

    collection = db.collection("Main Collection");
    queryRes = await collection.find().toArray();

    if (queryRes[0]?.["Election Status"] === "Not Started") {
      const nsObj = {
        "Election Status": "Not Started",
        "Voter Count": voterCount,
        "Candidate Count": candidateCount,
      };

      res.send(nsObj);
    } else if (queryRes[0]?.["Election Status"] === "Started") {
      const nsObj = {
        "Election Status": "Started",
        "Voter Count": voterCount,
        "Candidate Count": candidateCount,
      };

      res.send(nsObj);
    } else if (queryRes[0]?.["Election Status"] === "Finished") {
      let numberVoted = 0;

      collection = db.collection("Voters Collection");
      queryRes = await collection.find().toArray();

      numberVoted = queryRes.filter(
        (obj) => obj["Vote Casted"] === "Yes"
      ).length;
      const nsObj = {
        "Election Status": "Finished",
        "Voter Count": voterCount,
        "Candidate Count": candidateCount,
        "Number Voted": numberVoted,
      };

      res.send(nsObj);
    }
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
});

app.post("/app/votingcontrols/startelection", async (req, res) => {
  try {
    // await client.connect();
    const db = client.db("project");
    const collection = db.collection("Main Collection");

    await collection.updateOne(
      { "Election Status": "Not Started" },
      { $set: { "Election Status": "Started" } }
    );

    res.sendStatus(200);
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
});

app.post("/app/votingcontrols/stopelection", async (req, res) => {
  try {
    // await client.connect();
    const db = client.db("project");
    const collection = db.collection("Main Collection");

    await collection.updateOne(
      { "Election Status": "Started" },
      { $set: { "Election Status": "Finished" } }
    );

    res.sendStatus(200);
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
});

app.post("/app/votingcontrols/postresults", async (req, res) => {
  try {
    // await client.connect();
    const db = client.db("project");
    const collection = db.collection("Main Collection");

    await collection.updateOne(
      { "Election Status": "Finished" },
      { $set: { Results: 1 } }
    );

    res.sendStatus(200);
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
});

app.post("/app/piechartData", async (req, result) => {
  const pieObj = {
    arrayTemp: [],
    numVoters: 0,
  };
  let count = 0;

  try {
    // await client.connect();
    const db = client.db("project");
    let collection = db.collection("Voters Collection");

    let queryRes = await collection.find().toArray();
    pieObj.numVoters = queryRes.length;

    collection = db.collection("Candidates Collection");
    queryRes = await collection.find().toArray();

    queryRes.forEach((obj) => {
      pieObj.arrayTemp.push({
        name: [obj["Candidate Name"]],
        value: (obj["Number of Votes"] / pieObj.numVoters) * 100,
      });
      count = count + Number(obj["Number of Votes"]);
    });

    pieObj.arrayTemp.push({
      name: "Not Voted",
      value: ((pieObj.numVoters - count) / pieObj.numVoters) * 100,
    });

    result.send(pieObj);
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
});

app.post("/app/piechart", async (req, result) => {
  let max = 0;
  let winner = "";

  try {
    // await client.connect();
    const db = client.db("project");
    const collection = db.collection("Candidates Collection");

    const queryRes = await collection.find().toArray();

    queryRes.forEach((obj) => {
      if (obj["Number of Votes"] > max) {
        max = obj["Number of Votes"];
        winner = obj["Candidate Name"];
      }
    });

    result.send(winner);
  } catch (err) {
    throw err;
  } finally {
    // await client.close();
  }
});

app.post("/app/authuser", (req, res) => {
  console.log(req);
});

app.listen(3001, () => {
  console.log("Server started on 3001");
});
