import express from "express";
import tatachioRouter from "./routes/tatachio";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/test', (_req, res) => {
    console.log('someone is asking for /test');
    res.send('working');
})

app.use('/api/tatachio', tatachioRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});