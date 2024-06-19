import express from "express";
const app = express();
import fs from "fs";

const PORT = 8082; 

app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Hello world");
});

function readVideos() {
    const videosFile = fs.readFileSync("./data/videos.json");
    const videosData = JSON.parse(videosFile);
    return videosData; 
}

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

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});