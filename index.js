const express = require("express");
const app = express();
const Path = require("path");
const fs = require("fs");
// const indexEjs = require('./views/index.ejs');

// Middleware for parsing JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware for serving static files
app.use(express.static(Path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.render("index", { files: files });
  });
});
app.get("/files/:fileName", (req, res) => {
  fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
    console.log(req.params.fileName);
    return res.render("show", {
      fileName: req.params.fileName,
      fileData: data,
    });
  });
});
app.get("/edit/:fileName", (req, res) => {
  return res.render("edit", { fileName: req.params.fileName });
});

app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.previousName}`,
    `./files/${req.body.newName.split(" ").join("")}.txt`,
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      //   alert("File Re-Named successfully !!! ");
      return res.redirect("/");
    }
  ); 
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.detail,
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.redirect("/");
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
console.log("\n");
console.log("this is filename:" + __filename);
console.log("this is directory name" + __dirname);
console.log("\n");
