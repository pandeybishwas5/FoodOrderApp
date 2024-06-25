import { promises as fs } from 'node:fs';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const meals = await fs.readFile('./data/available-meals.json', 'utf8');
        res.status(200).json(JSON.parse(meals));
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
