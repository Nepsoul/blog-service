// Import required modules
const mongoose = require("mongoose");
const User = require("./models/user"); // Adjust path to your User model
const Blog = require("./models/blogs"); // Adjust path to your Blog model
const info = require("./utils/logger")
// MongoDB connection string
const MONGO_URL = "mongodb://localhost:27017/myapp"; // Adjust as necessary

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => info("Connected to MongoDB"))
.catch((err) => info("MongoDB connection error:", err));

// Dummy data for seeding
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Blog.deleteMany({});

    info("Cleared existing data.");

    // Create dummy users
    const users = await User.insertMany([
      {
        username: "johndoe",
        name: "John Doe",
        passwordHash: "hashedpassword1", // Replace with actual hashed password in production
      },
      {
        username: "janedoe",
        name: "Jane Doe",
        passwordHash: "hashedpassword2", // Replace with actual hashed password in production
      },
    ]);

    info("Inserted users:", users);

    // Create dummy blogs
    const blogs = await Blog.insertMany([
      {
        title: "First Blog",
        author: "John Doe",
        url: "https://example.com/first-blog",
        likes: 10,
        user: users[0]._id,
      },
      {
        title: "Second Blog",
        author: "Jane Doe",
        url: "https://example.com/second-blog",
        likes: 15,
        user: users[1]._id,
      },
      {
        title: "Another Blog by John",
        author: "John Doe",
        url: "https://example.com/another-blog",
        likes: 8,
        user: users[0]._id,
      },
    ]);

    info("Inserted blogs:", blogs);

    // Close the connection
    mongoose.connection.close();
    info("Database seeded and connection closed.");
  } catch (err) {
    info("Error seeding database:", err);
    mongoose.connection.close();
  }
};

// Run the seed script
seedData();