const express = require("express");
const cors = require("cors");
const collection = require("./mongoDB");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

// Login endpoint

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await collection.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User does not exist." });
      }
  
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        res.status(200).json({ message: "Logged In successfully!" });
      } else {
        res.status(401).json({ message: "Incorrect password." });
      }
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  




// Signup endpoint
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Store the hashed password in the database
    const newUser = await collection.insertMany([{ email, password: hashedPassword }]);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
