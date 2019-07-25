global.__rootdir = __dirname;

const express = require("express");
const bodyParser = require("body-parser");
const autoprefixer = require('express-autoprefixer');
const lessMiddleware = require('less-middleware');
const cookieSession = require("cookie-session");

const {controlSample, testSample, nameMap} = require(__rootdir + "/server/songs");
const {log} = require(__rootdir + "/server/db");

const PORT = process.env.PORT || 3000;

const app = express();
app.set("trust proxy", "127.0.0.1");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));

const staticPath = __dirname + '/public';
app.use(lessMiddleware(staticPath));
app.use(autoprefixer({browsers: ["last 3 versions", "> 1%"], cascade: false}));
app.use(express.static(staticPath));

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SECRET || "lorem ipsum"],
    maxAge: 24 * 60 * 60 * 1000
  })
);

app.use((req, res, next) => {
  if(!req.session.count) {
    req.session.count = 0;
  }
  next();
})

app.get("/music/:id", (req, res, next) => {
  if(Object.keys(nameMap).includes(req.params.id)){
    return res.sendFile(nameMap[req.params.id]);
  }
  next();
});

app.get("/", (req, res) => {
  const count = req.session.count;

  if(!req.session.samples) req.session.samples = count % 2 === 0? controlSample(): testSample()

  res.render("pages/index", {
    samples: req.session.samples,
    informal: req.query.informal,
    trial: req.session.count
  })
});

app.post("/vote", (req, res) => {
  req.session.count++;
  req.session.samples = undefined;

  log(req.ip, req.body.name, req.body.other);

  res.redirect("back");
})

app.listen(PORT, () => console.log(`Started server at port ${PORT}`));
