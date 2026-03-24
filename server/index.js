import express from "express";
import cors from "cors";
import env from "dotenv";
import pg from "pg";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import bcrypt from "bcrypt";
const saltRounds = 10;

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //One day length cookie
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.get("/dashboard", isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

app.get("/logs", isAuthenticated, async (req, res) => {
  const username = req.user.email;
  try {
    const result = await db.query(
      "SELECT * FROM logs WHERE email = $1 ORDER BY time_created DESC",
      [username],
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Fetching Logs" });
  }
});

app.post("/logs", isAuthenticated, async (req, res) => {
  const email = req.user.email;
  const { type, content, due_date, scheduled_time, status } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO logs (email, type, content, due_date, scheduled_time, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [email, type, content, due_date, scheduled_time, status],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Adding Log" });
  }
});

app.delete("/logs/:id", isAuthenticated, async (req, res) => {
  const email = req.user.email;
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM logs WHERE id = $1 AND email = $2 RETURNING *",
      [id, email],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting log" });
  }
});

// Authentication
app.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  }
  res.status(401).json({ user: null });
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Logged in", user: req.user });
});

app.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          // console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash],
          );
          const user = result.rows[0];
          req.logIn(user, (err) => {
            console.log(err);
            res.json({ message: "Registered", user });
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb(null, false);
      }
    } catch (err) {
      return cb(err);
    }
  }),
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
