import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 3000;

// Use the cors middleware
app.use(cors({
    origin: ['http://localhost:5173'], // Allow both frontend domain and localhost
    methods: ['GET', 'POST'], // Allow only specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
    // credentials: true, // Allow cookies or credentials
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/meals', async (req, res) => {
    const mealsPath = path.join(__dirname, 'data', 'available-meals.json');
    const meals = await fs.readFile(mealsPath, 'utf8');
    res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
    try {
        const ordersPath = path.join(__dirname, 'data', 'orders.json');
        const orderData = req.body.order;

        if (!orderData || !orderData.items || orderData.items.length === 0) {
            return res.status(400).json({ message: 'Missing data.' });
        }

        const newOrder = {
            ...orderData,
            id: (Math.random() * 1000).toString(),
        };
        const orders = await fs.readFile(ordersPath, 'utf8');
        const allOrders = JSON.parse(orders);
        allOrders.push(newOrder);
        await fs.writeFile(ordersPath, JSON.stringify(allOrders));
        res.status(201).json({ message: 'Order created!' });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.use((req, res) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    res.status(404).json({ message: 'Not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
