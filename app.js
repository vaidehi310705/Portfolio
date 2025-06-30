const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const projects = [
  {
    title: "Movie Guide",
    description: "Simple Movie guide app.",
    github: "https://github.com/vaidehi310705/Movie_Guide",
    image: "/images/movieguide.png",
  },
  {
    title: "Finance Tracker App",
    description: "My  Personal Finance tracker built with Flutter.",
    github: "https://github.com/vaidehi310705/Finance_tracker",
    image: "/images/financetracker.png",
  },
  {
    title: "Elite Clothesline",
    description:
      "An elegant and responsive website for a modern clothing shop.",
    github: "",
    image: "/images/elite.png",
  },
];
app.get("/", (req, res) => {
  res.render("home", { title: "Vaidehi's Portfolio", projects });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
