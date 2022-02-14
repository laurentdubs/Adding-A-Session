import express from "express";
import nunjucks from "nunjucks";
import cookie from "cookie";

const listOfUsers = [
    {
        name: "Laurent",
        password: "Laurent/123",
    },
    {
        name: "Frieda",
        password: "Frieda/456",
    },
    {
        name: "John",
        password: "John/789",

    }
]

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/login", (request, response) => {
  response.render("login");
});

const formParser = express.urlencoded({ extended: true });

app.post("/private", formParser, (request, response) => {
  const users = request.body;
  console.log(users);
   response.set(
    "Set-Cookie",
    cookie.serialize("username", users.name,{
      maxAge: 3600,
    }),
  );
  response.render("private", { users });
});

app.get("/logout", (request, response) => {
  const user = request.body;
  console.log(user);
  response.set(
    "Set-Cookie",
    cookie.serialize("username", " ", {
      maxAge: 0,
    }),
  );
  response.render("home");
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
