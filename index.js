global.__rootdir = __dirname;

const express = require("express");
const autoprefixer = require('express-autoprefixer');
const lessMiddleware = require('less-middleware');
const cookieSession = require("cookie-session");

const {data, nameMap} = require(__rootdir + "/server/songs");

const PORT = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");

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

const apiBase = "/music";
app.get(apiBase + "/:id", (req, res, next) => {
  if(Object.keys(nameMap).includes(req.params.id)){
    return res.sendFile(nameMap[req.params.id]);
  }
  next();
});

const getSample = type => {
  const samples = data[type];

  const curr = samples[Math.floor(samples.length * Math.random())];

  return {
    url: apiBase + "/" + curr.name,
    name: curr.name
  }
}

app.get("/", (req, res) => {
  res.render("pages/index", {
    samples: [
      {url: "asdf", name: "a"},
      {url: "asdfe", name: "b"}
    ]
  })
});

app.post("/vote", (req, res) => {
  req.session.trials++;
})

app.listen(PORT, () => console.log(`Started server at port ${PORT}`));
