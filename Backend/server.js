const express = require("express");
const cors = require("cors");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/app/adminlogin", (req, res) => {
  // console.log(req.body);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    var query = { Email: req.body.Email };
    dbo
      .collection("Main Collection")
      .find(query)
      .toArray(function (err, result) {
        // if (err) throw err;
        if (result === undefined || result[0] === undefined) {
          // console.log("Not found");
          res.sendStatus(666);
        } else if (result[0]?.Password === req.body.Password)
          res.sendStatus(200);
        else res.sendStatus(666);
        db.close();
      });
  });
});

app.post("/app/userlogin", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Main Collection")
      .find()
      .toArray(function (err, result) {
        // if (err) throw err;
        if (result === undefined || result[0] === undefined) {
          // console.log("Not found");
          res.sendStatus(666);
        } else if (result[0]?.["Election Status"] === "Not Started")
          res.sendStatus(333);
        else if (result[0]?.["Election Status"] === "Finished")
          res.sendStatus(335);
        else {
          var query = { "Voter Email": req.body.Email };
          dbo
            .collection("Voters Collection")
            .find(query)
            .toArray(function (err, result) {
              // if (err) throw err;
              if (result === undefined || result[0] === undefined) {
                // console.log("Not found");
                res.sendStatus(666);
              } else if (
                result[0]?.["Voter Password"] === req.body.Password &&
                result[0]?.["Voter Company"] === req.body.Company
              ) {
                if (result[0]?.["Vote Casted"] === "Yes") res.sendStatus(982);
                else res.sendStatus(200);
              } else res.sendStatus(666);
              db.close();
            });
        }
        // db.close();
      });
  });
});

app.post("/app/signup", (req, res) => {
  // console.log(req.body);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    var myobj = req.body;
    myobj["Election Status"] = "Not Started";
    myobj["Results"] = 0; //Not Posted
    dbo.collection("Main Collection").insertOne(myobj, function (err, res) {
      if (err) throw err;
      // console.log("1 document inserted");
      db.close();
    });
  });

  res.sendStatus(200);
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
  (req, res, next) => {
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

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("project");
      dbo
        .collection("Voters Collection")
        .insertMany(objectTemp["Sheet1"], function (err, res) {
          if (err) throw err;
          // console.log("1 document inserted");
          db.close();
        });
    });

    res.sendStatus(200);
  }
);

app.post(
  "/app/insertfiles/candidateData",
  upload.single("file"),
  (req, res, next) => {
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

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("project");
      dbo
        .collection("Candidates Collection")
        .insertMany(objectTemp["Sheet1"], function (err, res) {
          if (err) throw err;
          // console.log("1 document inserted");
          db.close();
        });
    });

    res.sendStatus(200);
  }
);
////////////////

app.post("/app/votingpage", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Candidates Collection")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        db.close();
      });
    // setTimeout(() => {
    //   db.close();
    // }, 1500);
  });
});

app.post("/app/votingpage/vote", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Candidates Collection")
      .updateOne(
        { "Candidate Name": `${req.body.candidate}` },
        { $inc: { "Number of Votes": 1 } },
        function (err, res) {
          if (err) throw err;

          // db.close();
        }
      );
    dbo
      .collection("Voters Collection")
      .updateOne(
        { "Voter Email": req.body.voter },
        { $set: { "Voted For": req.body.candidate, "Vote Casted": "Yes" } },
        function (err, res) {
          if (err) throw err;

          db.close();
        }
      );
  });
  res.sendStatus(200);
});

app.post("/app/thankyou", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Voters Collection")
      .find({ "Voter Email": req.body.voter })
      .toArray(function (err, result) {
        if (err) throw err;
        const thankyouObj = {
          votedFor: result[0]["Voted For"],
          nameVoter: result[0]["Voter Name"],
        };
        db.close();
        res.send(thankyouObj);
      });
  });
});

app.post("/app/thankyou/gotoresults", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Main Collection")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        if (result[0]?.["Results"] === 1) res.sendStatus(200);
        else res.sendStatus(999);
        db.close();
      });
  });
});

app.post("/app/votingcontrols", (req, res) => {
  let voterCount = 0;
  let candidateCount = 0;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Voters Collection")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        voterCount = result.length;
        db.close();
      });
  });

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Candidates Collection")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        candidateCount = result.length;
        db.close();
      });
  });

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Main Collection")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;

        if (result[0]?.["Election Status"] === "Not Started") {
          const nsObj = {
            "Election Status": "Not Started",
            "Voter Count": voterCount,
            "Candidate Count": candidateCount,
          };

          res.send(nsObj);
        } else if (result[0]?.["Election Status"] === "Started") {
          const nsObj = {
            "Election Status": "Started",
            "Voter Count": voterCount,
            "Candidate Count": candidateCount,
          };

          res.send(nsObj);
        } else if (result[0]?.["Election Status"] === "Finished") {
          let numberVoted = 0;

          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("project");
            dbo
              .collection("Voters Collection")
              .find()
              .toArray(function (err, result) {
                if (err) throw err;
                numberVoted = result.filter(
                  (obj) => obj["Vote Casted"] === "Yes"
                ).length;
                const nsObj = {
                  "Election Status": "Finished",
                  "Voter Count": voterCount,
                  "Candidate Count": candidateCount,
                  "Number Voted": numberVoted,
                };

                res.send(nsObj);
                db.close();
              });
          });
        }

        db.close();
      });
  });
});

app.post("/app/votingcontrols/startelection", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Main Collection")
      .updateOne(
        { "Election Status": "Not Started" },
        { $set: { "Election Status": "Started" } },
        function (err, result) {
          if (err) throw err;
          res.sendStatus(200);
          db.close();
        }
      );
  });
});

app.post("/app/votingcontrols/stopelection", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Main Collection")
      .updateOne(
        { "Election Status": "Started" },
        { $set: { "Election Status": "Finished" } },
        function (err, result) {
          if (err) throw err;
          res.sendStatus(200);
          db.close();
        }
      );
  });
});

app.post("/app/votingcontrols/postresults", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Main Collection")
      .updateOne(
        { "Election Status": "Finished" },
        { $set: { Results: 1 } },
        function (err, result) {
          if (err) throw err;
          res.sendStatus(200);
          db.close();
        }
      );
  });
});

app.post("/app/piechartData", (req, result) => {
  const pieObj = {
    arrayTemp: [],
    numVoters: 0,
  };
  let count = 0;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Voters Collection")
      .find()
      .toArray((err, res) => {
        if (err) throw err;

        pieObj.numVoters = res.length;

        db.close();
      });
  });

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Candidates Collection")
      .find()
      .toArray((err, res) => {
        if (err) throw err;

        res.forEach((obj) => {
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
        db.close();
      });
  });
});

app.post("/app/piechart", (req, result) => {
  let max = 0;
  let winner = "";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("project");
    dbo
      .collection("Candidates Collection")
      .find()
      .toArray((err, res) => {
        if (err) throw err;

        res.forEach((obj) => {
          if (obj["Number of Votes"] > max) {
            max = obj["Number of Votes"];
            winner = obj["Candidate Name"];
          }
        });

        result.send(winner);

        db.close();
      });
  });
});

app.listen(3001, () => {
  console.log("Server started on 3001");
});
