var express = require("express");
var mysql = require('mysql');
var app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    password: 'mex1c0!',
    database: 'rankiall',
    debug: false,
    multipleStatements: true
});


function getVotes(req, res) {

    var showId = req.params['showId'];
 
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({ "code": 100, "status": "Error in connection database" + err });
            return;
        }
        let getVotesQuery = `SELECT sum(wins) as votes FROM  episodes WHERE showid = ${showId};`;
        let query = getVotesQuery;
        console.log(query);
        connection.query(query, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
            else {
                console.log('in onError');
                res.json({ "code": 100, "status": "Database error.", "err": err});
                return;
            }
        }); 
    });
}

function getComments(req, res) {
 
    var showId = req.params['showId'];

    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({ "code": 100, "status": "Error in connection database" + err });
            return;
        }
        let query = `SELECT * FROM rankiall.comments where showid = ${showId};`; 
        console.log(query);
        connection.query(query, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
            else {
                console.log('in onError');
                res.json({ "code": 100, "status": "Database error.", "err": err});
                return;
            }
        }); 
    });
}

function vote(req, res) {
 
    var showId = req.params['showId'];
    var winId = req.params['winId'];
    var loseId = req.params['loseId'];
    var wid = showId + winId;
    var lid = showId + loseId;
 
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({ "code": 100, "status": "Error in connection database" + err });
            return;
        }
        let winQuery = `INSERT INTO episodes (id, showid, episodeid, wins) VALUES ('${wid}', ${showId}, '${winId}', 1) ON DUPLICATE KEY UPDATE wins = wins + 1; `;
        let loseQuery = `INSERT INTO episodes (id, showid, episodeid, losses) VALUES ('${lid}', ${showId}, '${loseId}', 1) ON DUPLICATE KEY UPDATE losses = losses + 1; `;
        let getCountsQuery = `SELECT sum(wins) as votes FROM  episodes where showid = ${showId};`;
        let query = winQuery + loseQuery + getCountsQuery;
        console.log(query);
        connection.query(query, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
            else {
                console.log('in onError');
                res.json({ "code": 100, "status": "Database error.", "err": err});
                return;
            }
        }); 
    });
}

function savecomment(req, res) {

    // :showId/:comment
 
    var showId = req.params['showId'];
    var comment = req.params['comment'];
 
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({ "code": 100, "status": "Error in connection database" + err });
            return;
        }
 
        let query = `INSERT INTO comments (showid, comment) VALUES ('${showId}', '${comment}');`;
 
        console.log(query);
        connection.query(query, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
            else {
                console.log('in onError');
                res.json({ "code": 100, "status": "Database error.", "err": err});
                return;
            }
        }); 
    });
}

function saveoverview(req, res) {

    // :showId/:episodeId/:longEpisodeId/:episodeOverview
 
    var showId = req.params['showId'];
    var episodeId = req.params['episodeId'];
    var longEpisodeId = req.params['longEpisodeId'];
    var overview = req.params['episodeOverview'];
 
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({ "code": 100, "status": "Error in connection database" + err });
            return;
        }
 
        let query = `INSERT INTO episodes (id, showid, episodeid, wins, losses, overview) VALUES ('${longEpisodeId}', '${showId}', '${episodeId}', 0, 0, '${overview}') ON DUPLICATE KEY UPDATE overview = '${overview}';`;
 
        console.log(query);
        connection.query(query, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
            else {
                console.log('in onError');
                res.json({ "code": 100, "status": "Database error.", "err": err});
                return;
            }
        }); 
    });
}

function getEpisodes(req, res) {

    let showId = req.params['showId'];

    pool.getConnection(function (err, connection) {

        if (err) {
            res.json({ "code": 100, "status": "Error in connection database" + err });
            return;
        }
        let query = `SELECT * FROM ( SELECT id, showid, episodeid, name, overview, wins, losses, wins/(wins+losses)*100 AS ratio, @curRow := @curRow + 1 AS rank FROM episodes JOIN (SELECT @curRow := 0) r  where showid = '${showId}' order by ratio DESC, wins DESC, losses ASC ) as t;`;
        console.log(query);
  
        connection.query(query, function (err, rows) {

            connection.release();

            if (!err) {
                res.json(rows);
            }
            else {
                res.json({ "code": 100, "status": "Database error.", "err": err});
                return;
            }
        }); 
    });
}

function getEpisodeData(req, res) {

    let showId = req.params['showId'];
    let longEpisodeId = req.params['longEpisodeId'];

    pool.getConnection(function (err, connection) {

        if (err) {
            res.json({ "code": 100, "status": "Error in connection database" + err });
            return;
        }
        let query = `SELECT * FROM ( SELECT id, showid, episodeid, name, overview, wins, losses, wins/(wins+losses)*100 AS ratio, @curRow := @curRow + 1 AS rank FROM episodes JOIN (SELECT @curRow := 0) r  where showid = '${showId}' order by ratio DESC, wins DESC, losses ASC ) as t WHERE id = '${longEpisodeId}';`;
        console.log(query);
  
        connection.query(query, function (err, rows) {

            connection.release();

            if (!err) {
                res.json(rows);
            }
            else {
                res.json({ "code": 100, "status": "Database error.", "err": err});
                return;
            }
        }); 
    });
}

function getTopTen(req, res) {
 
    pool.getConnection(function (err, connection) {

        if (err) {
            res.json({ "code": 100, "status": "Error in connection database" + err });
            return;
        }
        let query = `SELECT showid, sum(wins) as votes FROM rankiall.episodes group by showid order by votes desc limit 12;`;
        console.log(query);
  
        connection.query(query, function (err, rows) {

            connection.release();

            if (!err) {
                res.json(rows);
            }
            else {
                res.json({ "code": 100, "status": "Database error.", "err": err});
                return;
            }
        }); 
    });
}

app.get("/api/votes/:showId", function (req, res) {
    getVotes(req, res);
});

app.get("/api/comments/:showId", function (req, res) {
    getComments(req, res);
});

app.get("/api/getepisodes/:showId", function (req, res) {
    getEpisodes(req, res);
});

app.get("/api/episode/:showId/:longEpisodeId", function (req, res) {
    getEpisodeData(req, res);
});

app.get("/api/vote/:showId/:winId/:loseId", function (req, res) {
    vote(req, res);
});
 
app.get("/api/saveoveriew/:showId/:episodeId/:longEpisodeId/:episodeOverview", function (req, res) {
    saveoverview(req, res);
});
 
app.get("/api/savecomment/:showId/:comment", function (req, res) {
    savecomment(req, res);
});

app.get("/api/topten", function (req, res) {
    getTopTen(req, res);
});

app.listen(3001);