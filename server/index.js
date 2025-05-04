const express = require("express");
const app = express();
const cors = require("cors");
const { v4 } = require("uuid");
const db = require("./db");

app.use(cors());
app.use(express.json());

app.get("/links", async (req, res) => {
  try {
    const allLinks = await db.query("SELECT * FROM short_links");
    res.json(allLinks.rows);
  } catch (error) {
    console.error(error);
  }
});

app.get("/links/:id", async (req, res) => {
  try {
    const link = await db.query("SELECT * FROM short_links WHERE id = $1", [
      req.params.id,
    ]);
    res.redirect(link.rows[0].link);
  } catch (error) {
    console.error(error);
  }
});

app.post("/links", async (req, res) => {
  try {
    const { link } = req.body;
    const id = v4().slice(0, 8);

    const newLink = await db.query(
      "INSERT INTO short_links (id, link) VALUES ($1, $2) RETURNING id",
      [id, link]
    );

    res.json(newLink.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

app.listen(9393, () => {
  console.log("Server is currently listening on port: 9393");
});
