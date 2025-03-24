const express = require("express");
const connectDB = require("./config/database");

const app = express();
const port = 3000;
const User = require("./models/user");
//returns promise
connectDB().then(() => {
  console.log('Connected to database :)');
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}).catch((err) => {
  console.log("Error connecting to database : ", err);
});

app.use(express.json());

app.post('/api/signup', async (req, res) => {

  const user = new User(req.body);

  await user.save().then(() => {  
    res.status(201).json(user);
  }).catch((err) => {
    res.status(500).json(err);
  });

});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" }); // Return after sending response
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get('/api/users-email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return after sending response
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



