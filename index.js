const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const axios = require("axios");
const path = require("path");

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs'); 
app.set('views', './views'); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://mongo:mongo@cluster0.6us6keo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
require("dotenv").config(); 

const githubApiKey = process.env.GITHUB_API_KEY;
// Blog post modeli
const blogPostSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  longDescription: String,
  submissionTime: {
    type: Date,
    default: Date.now,
  },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

app.get("/blog/new", (req, res) => {
  res.render("newBlog");
});

app.post("/blog", async (req, res) => {
  const { title, shortDescription, longDescription } = req.body;
  try {
    const newBlogPost = new BlogPost({
      title: title,
      shortDescription: shortDescription,
      longDescription: longDescription,
    });
    await newBlogPost.save();
    res.redirect("/blog"); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving blog post");
  }
});
app.get("/gpv", async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.render("gpv", { blogPosts: blogPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving blog posts");
  }
});
app.get("/blog", async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.render("index", { blogPosts: blogPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving blog posts");
  }
});
app.get("/", async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.render("index", { blogPosts: blogPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving blog posts");
  }
});

const PER_PAGE = 100;
app.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const [userResponse, reposResponse, gistsResponse] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${githubApiKey}`,
        },
      }),
      axios.get(`https://api.github.com/users/${username}/repos`, {
        params: {
          per_page: PER_PAGE,
        },
        headers: {
          Authorization: `token ${githubApiKey}`,
        },
      }),
      axios.get(`https://api.github.com/users/${username}/gists`, {
        params: {
          per_page: PER_PAGE,
        },
        headers: {
          Authorization: `token ${githubApiKey}`,
        },
      })
    ]);

    const user = userResponse.data;
    const repos = reposResponse.data;
    const gists = gistsResponse.data;

    const createdAt = new Date(user.created_at);
    const today = new Date();
    let age = today.getFullYear() - createdAt.getFullYear();
    if (
      today.getMonth() < createdAt.getMonth() ||
      (today.getMonth() === createdAt.getMonth() &&
        today.getDate() < createdAt.getDate())
    ) {
      age--;
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    }

    const totalStars = repos.reduce(
      (total, repo) => total + repo.stargazers_count,
      0
    );
    const totalForks = repos.reduce(
      (total, repo) => total + repo.forks_count,
      0
    );

    // Gists verilerini işle ve dönüştür
    const formattedGists = gists.map(gist => {
      const files = Object.values(gist.files);
      const firstFile = files.length > 0 ? files[0] : null;

      return {
        url: gist.html_url,
        id: gist.id,
        filename: firstFile ? firstFile.filename : null,
        language: firstFile ? firstFile.language : null,
        description: gist.description,
        created_at: new Date(gist.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
        }),
        updated_at: new Date(gist.updated_at).toLocaleDateString('en-US', {
          year: 'numeric',
        }),
        comments: gist.comments,
      };
    });

    // Dosya adlarını içeren bir dizi oluştur
    const fileNames = formattedGists.map(gist => gist.filename);

    const totalRepos = repos.length;
    const averageStarsPerRepo = (totalStars / totalRepos).toFixed(2);
    let totalTopics = 0;
    repos.forEach((repo) => {
      totalTopics += repo.topics ? repo.topics.length : 0;
    });

    res.render("gpv", {
      user: user,
      repos: repos,
      gists: formattedGists,
      totalStars: totalStars,
      formatDate: formatDate,
      age: age,
      totalForks: totalForks,
      fileNames: fileNames,
      totalTopics: totalTopics,
      averageStarsPerRepo: averageStarsPerRepo,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("User not found or data not accessible");
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
