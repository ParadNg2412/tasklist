import express, {Request, Response} from 'express';
import axios from 'axios';


const app = express;
const port = 3000;

app.get('/tasks', async (req: Request, res: Response) => {
    try{
        const Response = await axios.get('https//example.com/api/tasks');
        res.json(Response.data);
    } catch(error){
        console.error('Error fetching tasks:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`)
});