import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/', (req: Request, res: Response) => {
    res.send('Hello: World!!!');
})

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos);
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    if (req.params.videoId === 'empty') {
        res.send(400)
    }
    const id = +req.params.videoId;

    const video = videos.find(video => video.id === id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }

    // IF VIDEO IS NOW EXISTS THEN RETURN 404 CODE
})
app.post('/videos', (req: Request, res: Response) => {
    if (!req.body.title) {
        res.send(400)
    } else {
        const newVideo = {
            id: +(new Date()),
            title: req.body.title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
        res.status(201).send(newVideo)
    }
})

app.put('/videos/:id', (req: Request, res: Response) => {
    const title = req.body.title;
    if (req.params.id === 'empty' || !title) {
        res.send(400)
    }
    const id = +req.params.id;

    const video = videos.find(video => video.id === id)
    if (video) {
        video.title = title;
        res.status(204).send(video)
    } else {
        res.send(404)
    }
})

app.delete('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const resultVideos = videos.filter(video => video.id !== id)
    if (resultVideos.length === videos.length) {
        res.send(404)
    } else {
        videos = resultVideos;
        res.send(204)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})