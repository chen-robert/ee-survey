const express = require("express"),
 autoprefixer = require('express-autoprefixer'),
 lessMiddleware = require('less-middleware');

const PORT = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");

const staticPath = __dirname + '/public';
app.use(lessMiddleware(staticPath));
app.use(autoprefixer({browsers: ["last 3 versions", "> 1%"], cascade: false}));
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.render("pages/index", {
    samples: [
      {url: "asdf", name: "a"},
      {url: "asdfe", name: "b"}
    ]
  })
});

app.post("/vote", (req, res) => {
  
})

app.listen(PORT, () => console.log(`Started server at port ${PORT}`));
