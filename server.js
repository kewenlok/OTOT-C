const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
require('dotenv').config();

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

try {
  require("./config/database").connect();
} catch (error) {
  console.log(`Failed to connect to DB. Error: ${error}`);
}

app.post('/register/:role', async(req, res) => {
  try {
    const { username, password } = req.body;
    const role = req.params.role === 'admin' ? 'admin' : 'user';
    
    if (!username || !password) {
      return res.status(400).send("Username and password cannot be empty!");
    }

    // Check if the username exists
    const currentUser = await User.findOne({ username });

    if (currentUser) {
      return res.status(409).send('User account already exist. Please login instead.')
    }

    // Hash user password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user account in database
    const user = await User.create({ username, password: hashedPassword, role });

    return res.status(201).json(user._doc);
  } catch (error) {
    console.error(`An error occured when registering for an account: ${error}`);
  }
});

app.post('/login', async(req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Username and password cannot be empty!");
    }

    // Check if the username exists
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate new JWT token
      const token = jwt.sign(
        { user_id: user._id, username, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({...user._doc, token});
    }
    return res.status(400).send("Invalid credentials. Please make sure that your username and password are correct!");
  } catch (error) {
    console.error(`An error occured when logging in: ${error}`);
  }
});

app.get('/home', auth, (req, res) => {
  return res.status(200).send(`Welcome back, ${req.user.username}!`);
});

app.get('/admin', auth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send("You do not have permission to view this page!");
  }
  return res.status(200).send(`Hi ${req.user.username}, you are visiting an admin page!`);
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, function () {
  console.log(`Running Authentication and Authorization server on port ${PORT}`);
});