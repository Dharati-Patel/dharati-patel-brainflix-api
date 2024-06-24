import express from "express";
const app = express();
import cors from "cors";
import fs from "fs";
import "dotenv/config";
import uuid4 from "uuid4";
 
let { PORT, CROSS_ORIGIN } = process.env;

PORT = PORT || 8082;

app.use(cors({ origin: CROSS_ORIGIN }));
app.use(express.json());

const readVideos = () => {
    const videosFile = fs.readFileSync("./data/videos.json");
    const videosData = JSON.parse(videosFile);
    return videosData; 
};

const writeVideos = (data) => {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync("./data/videos.json", stringifiedData);
};

app.get("/videos", (_req, res) => {
    const videosData = readVideos();
    res.json(videosData);
});

app.get("/videos/:id", (req, res) => {
    const id = req.params.id;
    const videosData = readVideos();
    const video = videosData.find((video) => video.id === id);
    if (video) {
        return res.json(video);
    } else {
        return res.status(404).json({ error: "Video not found" });
    }
});

app.post("/videos", (req, res) => {
    console.log(req.body);
    const videos = readVideos();

    const newVideo = {
        id: uuid4(),
        title: req.body.title || "Midnight",
        channel: req.body.channel || "Taylor Swift",
        image: req.body.image || "https://img.freepik.com/free-photo/nature-tranquil-beauty-reflected-calm-water-generative-ai_188544-12798.jpg?t=st=1718983167~exp=1718986767~hmac=6d1a33b171af7a6dc5ead00a4e46e7e2f5a5468be73d198d8bb70503c0ae6ba7&w=1380",
        description: req.body.description || "Explore the cutting-edge developments and predictions for Artificial Intelligence in the coming years. From revolutionary breakthroughs in machine learning to the ethical considerations influencing AI advancements, this exploration transcends the boundaries of mere speculation. Join us on a journey that navigates the intricate interplay between innovation, ethics, and the ever-evolving tech frontier.",
        views: req.body.views || "980,544",
        likes: req.body.likes || "22,479",
        duration: req.body.duration || "4:01",
        video: req.body.video || "https://unit-3-project-api-0a5620414506.herokuapp.com/images/image7.jpg",
        timestamp: req.body.timestamp || 1691471862000,
        comments: req.body.comments || [
            {
                id: uuid4(),
                name: req.body.name || "James Phills",
                comment: req.body.comment || "Your insights into the future of AI are enlightening! The intersection of technology and ethics is particularly thought-provoking. Keep us updated on the tech front!",
                likes: req.body.likes || 0,
                timestamp: req.body.timestamp || 1691731062000
            },
            {
                id: uuid4(),
                name: req.body.name || "Gelard Gallent",
                comment: req.body.comment || "This video is a fantastic overview of the AI landscape. Your ability to distill complex concepts into digestible content is impressive. Can't wait for more tech insights!",
                likes: req.body.likes || 4,
                timestamp: req.body.timestamp || 1691731062000
            },
            {
                id: uuid4(),
                name: req.body.name || "Jeremy Young",
                comment: req.body.comment || "Can't wait to try some of these gastronomic delights in my own kitchen. Keep those delicious discoveries coming!",
                likes: req.body.likes || 4,
                timestamp: req.body.timestamp || 1691731062000
            }
        ],
    };
    videos.push(newVideo);
    writeVideos(videos);
    res.status(201).json(newVideo);
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});