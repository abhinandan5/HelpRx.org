var express = require("express");
var fileuploader = require("express-fileupload");
var mysql = require("mysql2");
var cors = require("cors"); //cross platform
//node and postman are different software's

var app = express();

app.use(cors());

app.listen(2005, function () {
  console.log("Server Started...");
});
app.use(express.urlencoded(true));
//it allows html files to find all requested API in the server file
//============================================================
app.use(express.static("public"));
app.use(fileuploader());
app.get("/newproject", function (req, resp) {
  resp.sendFile(process.cwd() + "/public/newproject.html");
});
app.get("/", function (req, resp) {
  resp.sendFile(process.cwd() + "/public/index.html");
});

//==================| DB Operations |=========================
var config = {
  host: "127.0.0.1",
  user: "root",
  password: "536642",
  database: "project",
  datestrings: true,
};

//==============| Creating Connection |=======================
var dbConn = mysql.createConnection(config);

dbConn.connect(function (jasoos) {
  if (jasoos == null) console.log("Connected to DataBase....");
  else console.log(jasoos);
});

//===================| API's for Ajax |==========================

//----------===| Index Page |===----------

//------------------| Signup Button |---------------------------
app.get("/signup", function (req, resp) {
  dbConn.query(
    "insert into users(email,pwd,type,dos,status) values(?,?,?,current_date(),1)",
    [req.query.kuchEmail, req.query.kuchPwd, req.query.kuchType],
    function (err) {
      if (err == null) resp.send("You are sucessfully Signed Up");
      else console.log(err);
    }
  );
});

//------------------| SignIn Button |---------------------------
app.get("/signin", function (req, resp) {
  // var email = req.query.kuchSinEmail;

  // var password = req.query.kuchSinPwd;
  dbConn.query(
    "select type,status from users where email = ? and pwd = ?",
    [req.query.kuchSinEmail, req.query.kuchSinPwd], //carefull
    function (err, resultTable) {
      if (err == null) {
        if (resultTable.length == 1) {
          if (resultTable[0].status == 1) resp.send(resultTable[0].type);
          else resp.send("U R Blocked");
        } else resp.send("Invalid User Id/Password");
      } else resp.send(err.toString());
    }
  );
});

//----------===| Index Page Ends |===----------

//----------------------------------------------------------------

//=============================| Angular |=========================================

//----------===| Admin Page |===----------

//--------------| Fetch-All-Users Button  |-----------------------
app.get("/get-angular-all-records", function (req, resp) {
  //fixed
  dbConn.query("select * from users", function (err, resultTable) {
    if (err == null) resp.send(resultTable);
    else resp.send(err);
  });
});

//--------------------| Block Button  |------------------------
app.get("/do-angular-block", function (req, resp) {
  //saving data in table
  var email = req.query.emailKuch;
  //fixed                             //same seq. as in table
  dbConn.query(
    "update users set status = (0) where email=?",
    [email],
    function (err) {
      if (err == null) {
        resp.send("Account Blocked Successfully");
      } else resp.send(err);
    }
  );
});

//--------------------| Resume Button  |------------------------
app.get("/do-angular-resume", function (req, resp) {
  //saving data in table
  var email = req.query.emailKuch; //emailKuch is local to this
  //fixed                             //same seq. as in table
  dbConn.query(
    "update users set status = (1) where email=?",
    [email],
    function (err) {
      if (err == null) {
        resp.send("Account Resumed Successfully");
      } else resp.send(err);
    }
  );
});
//-----------------------------------------

//------------------| Show-Donors Button  |-----------------------
app.get("/get-angular-donors-records", function (req, resp) {
  //fixed
  dbConn.query("select * from donors", function (err, resultTable) {
    if (err == null) resp.send(resultTable);
    else resp.send(err);
  });
});

//------------------| Show-Needy's Button  |-----------------------
app.get("/get-angular-needys-records", function (req, resp) {
  //fixed
  dbConn.query("select * from needy", function (err, resultTable) {
    if (err == null) resp.send(resultTable);
    else resp.send(err);
  });
});

//----------===| Admin Page Ends |===----------

//----------------------------------------------------------------

//----------===| Med-Manager Page |===----------

//--------------| Fetch Available Medicine |-------------
app.get("/get-med-avail-records", function (req, resp) {
  //fixed
  dbConn.query("select * from medsavailable", function (err, resultTable) {
    if (err == null) resp.send(resultTable);
    else resp.send(err);
  });
});

//-----------------| UnAvail Button  |-----------------
app.get("/do-angular-unAvail", function (req, resp) {
  //saving data in table
  var srno = req.query.srnoKuch;

  dbConn.query(
    "delete from medsavailable where srno = ?",
    [srno],
    function (err) {
      if (err == null) {
        resp.send("Medicine UnAvailed Successfully");
      } else resp.send(err);
    }
  );
});

//----------===| Med-Manager Page Ends |===----------

//----------------------------------------------------------------------------------------------

//====================== |Checking Emails |==========================

// Function to handle email checking
function checkEmail(req, resp) {
  const email = req.query.kuchEmail;

  // Check if the email is provided
  if (!email) {
    return resp.status(400).json({ error: "Email is required." });
  }

  dbConn.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    function (err, resultTable) {
      if (err) {
        console.error("Database error:", err);
        return resp.status(500).json({ error: "Internal server error." });
      }

      if (resultTable.length === 1) {
        // Email exists
        resp.status(200).json({ message: "Email exists." });
      } else {
        // Email doesn't exist
        resp.status(404).json({ error: "Email not found." });
      }
    }
  );
}

// Endpoint for checking email for SignUp
app.get("/chk-signup-email", checkEmail);

// Endpoint for checking email for Profile-Donor
app.get("/chk-donor-profile-email", checkEmail);

// Endpoint for checking email for Avail-Med
app.get("/chk-avail-med-email", checkEmail);

// Endpoint for checking email for Settings
app.get("/chk-settings-email", checkEmail);

// Endpoint for checking email for Med-Manager
app.get("/chk-med-manager-email", checkEmail);

//----------------------------------------------------------------------------------------------

//======================| Updating Passwords |==========================

//------------------| Update Password Button of Donor Page |-----------------------
app.get("/updatePwd", function (req, resp) {
  dbConn.query(
    "update users set pwd = ? where email = ? and pwd = ? ",
    [req.query.newPwd, req.query.email, req.query.oldPwd],
    function (err) {
      if (err == null) resp.send("Password Updated SuccessFully");
      else resp.send(err);
    }
  );
});

//----------------------------------------------------------------------------------------------

//----------===| Avail-Med Page |===----------

//--------------------| Avail-Med Button |-------------------------
app.get("/availMed", function (req, resp) {
  dbConn.query(
    "insert into medsavailable values(0,?,?,?,?,?)",
    [
      req.query.email,
      req.query.medName,
      req.query.expDate,
      req.query.package,
      req.query.quantity,
    ],
    function (err) {
      if (err == null) resp.send("Medicine Records Saved SuccessFully");
      else resp.send(err);
    }
  );
});

//----------===| Avail-Med Page Ends |===----------

//----------------------------------------------------------------------------------------------

//----------===| Finder-Med Page |===----------

//------------------| Fetching Cities |-------------------
app.get("/fetch-city-from-donors", function (req, resp) {
  // SQL query to select distinct cities from donors table
  const sqlQuery = "SELECT DISTINCT city FROM donors";

  dbConn.query(sqlQuery, function (err, resultTable) {
    if (err) {
      console.error("Database error:", err);
      return resp.status(500).json({ error: "Internal server error." });
    }

    // Send the result table as response
    resp.status(200).json(resultTable);
  });
});

//------------------| Fetching Medicine |------------------
app.get("/fetch-med-from-availMeds", function (req, resp) {
  // SQL query to select distinct medicines from medsavailable table
  const sqlQuery = "SELECT DISTINCT med FROM medsavailable";

  dbConn.query(sqlQuery, function (err, resultTable) {
    if (err) {
      console.error("Database error:", err);
      return resp.status(500).json({ error: "Internal server error." });
    }

    // Send the result table as response
    resp.status(200).json(resultTable);
  });
});
//------------------| Finding Donors Button |----------------
app.get("/fetch-donors", function (req, resp) {
  const { medName, cityName } = req.query;

  // Check if both medicine name and city are provided
  if (!medName || !cityName) {
    return resp
      .status(400)
      .json({ error: "Both medicine name and city are required." });
  }

  // SQL query to find donors based on provided medicine name and city
  const sqlQuery = `
    SELECT donors.name, donors.address, donors.city, donors.email
    FROM donors
    INNER JOIN medsavailable ON donors.email = medsavailable.email
    WHERE medsavailable.med = ? AND donors.city = ?
  `;

  dbConn.query(sqlQuery, [medName, cityName], function (err, resultTable) {
    if (err) {
      console.error("Database error:", err);
      return resp.status(500).json({ error: "Internal server error." });
    }

    // Send the result table as response
    resp.status(200).json(resultTable);
  });
});

//----------===| Finder-Med Page Ends |===----------

//----------------------------------------------------------------------------------------------

//==================================================================================================

//============| DataBase Operations for Profile-Donor |==============
app.post("/db-submit-process", function (req, resp) {
  //-------------| File(Pic) Uploading |----------------------
  var fileName = "nopic.jpg";
  if (req.files != null) {
    // console.log(process.cwd());
    fileName = req.files.npPic.name;
    var path = process.cwd() + "/public/uploads/" + fileName;
    req.files.npPic.mv(path);
  }
  console.log(req.body);

  //--------------| saving data in table |---------------------
  var email = req.body.txtEmail;
  var name = req.body.txtName;
  var mobile = req.body.txtContact;
  var address = req.body.txtAddress;
  var city = req.body.listCity.toString();
  var proof = req.body.listProof.toString();

  //fixed for database connectivity .query
  dbConn.query(
    //      same sequence should be maintained as in the table
    "insert into donors(email,name,mobile,address,city,proof,picname) values(?,?,?,?,?,?,?)",
    [email, name, mobile, address, city, proof, fileName],
    function (err) {
      if (err == null) resp.send("Record Saved Successfully...");
      else resp.send(err);
    }
  );
});

//-----------------| Updating data in table |----------------------
app.post("/db-update-process", function (req, resp) {
  //-----------File(Pic) Uploading----------------
  var fileName = "nopic.jpg";
  if (req.files != null) {
    // console.log(process.cwd());
    fileName = req.files.npPic.name;
    var path = process.cwd() + "/public/uploads/" + fileName;
    req.files.npPic.mv(path);
  } else {
    fileName = req.body.hdn;
  }
  console.log(req.body);

  //----------------| saving data in table |------------------------
  var email = req.body.txtEmail;
  var name = req.body.txtName;
  var mobile = req.body.txtContact;
  var address = req.body.txtAddress;
  var city = req.body.listCity.toString();
  var proof = req.body.listProof.toString();

  dbConn.query(
    //      same sequence should be maintained as in the table
    "update donors set name = ?,mobile = ?,address = ?,city = ? ,proof = ? ,picname = ? where email = ?",
    [name, mobile, address, city, proof, fileName, email],
    function (err) {
      if (err == null) resp.send("Record Updated Successfully...");
      else resp.send(err);
    }
  );
});

//============| DataBase Operations for Profile-Needy |==============
app.post("/db-submit-process", function (req, resp) {
  //-------------| File(Pic) Uploading |----------------------
  var fileName = "nopic.jpg";
  if (req.files != null) {
    // console.log(process.cwd());
    fileName = req.files.npPic.name;
    var path = process.cwd() + "/public/uploads/" + fileName;
    req.files.npPic.mv(path);
  }
  console.log(req.body);

  //--------------| saving data in table |---------------------
  var email = req.body.txtEmail;
  var name = req.body.txtName;
  var mobile = req.body.txtContact;
  var gender = req.send.listGender.toString();
  var dob = req.query.dob;
  var address = req.body.txtAddress;
  var city = req.body.listCity.toString();
  var proof = req.body.listProof.toString();

  //fixed for database connectivity .query
  dbConn.query(
    //      same sequence should be maintained as in the table
    "insert into needy(email,name,mobile,gender,dob,address,city,proof,picname) values(?,?,?,?,?,?,?)",
    [email, name, mobile, gender, dob, address, city, proof, fileName],
    function (err) {
      if (err == null) resp.send("Record Saved Successfully...");
      else resp.send(err);
    }
  );
});

//-----------------| Updating data in table |----------------------
app.post("/db-update-process", function (req, resp) {
  //-----------File(Pic) Uploading----------------
  var fileName = "nopic.jpg";
  if (req.files != null) {
    // console.log(process.cwd());
    fileName = req.files.npPic.name;
    var path = process.cwd() + "/public/uploads/" + fileName;
    req.files.npPic.mv(path);
  } else {
    fileName = req.body.hdn;
  }
  console.log(req.body);

  //----------------| saving data in table |------------------------
  var email = req.body.txtEmail;
  var name = req.body.txtName;
  var mobile = req.body.txtContact;
  var gender = req.send.listGender.toString();
  var dob = req.query.dob;
  var address = req.body.txtAddress;
  var city = req.body.listCity.toString();
  var proof = req.body.listProof.toString();

  dbConn.query(
    //      same sequence should be maintained as in the table
    "update needy set name = ?,mobile = ?,gender = ?,dob = ?,address = ?,city = ? ,proof = ? ,picname = ? where email = ?",
    [name, mobile, gender, dob, address, city, proof, fileName, email],
    function (err) {
      if (err == null) resp.send("Record Updated Successfully...");
      else resp.send(err);
    }
  );
});

//-----------------| Searching data by Email ID |----------------------
app.post("/db-search-process", function (req, resp) {
  // Extract the email ID from the request body
  var email = req.body.txtEmail;

  // Query the database to search for details by email ID
  dbConn.query(
    "SELECT * FROM needy WHERE email = ?",
    [email],
    function (err, result) {
      if (err) {
        console.error("Database error:", err);
        resp.status(500).send("Internal server error.");
        return;
      }

      if (result.length === 1) {
        // Details found, send the details as response
        resp.status(200).json(result[0]);
      } else {
        // No details found for the given email ID
        resp.status(404).send("Details not found.");
      }
    }
  );
});
