import { promises as fs } from 'node:fs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const orderData = req.body.order;

        if (!orderData || !orderData.items || orderData.items.length === 0) {
            return res.status(400).json({ message: 'Missing data.' });
        }

        const { customer } = orderData;
        if (
            !customer.email || !customer.email.includes('@') ||
            !customer.name || customer.name.trim() === '' ||
            !customer.street || customer.street.trim() === '' ||
            !customer['postal-code'] || customer['postal-code'].trim() === '' ||
            !customer.city || customer.city.trim() === ''
        ) {
            return res.status(400).json({
                message: 'Missing data: Email, name, street, postal code or city is missing.',
            });
        }

        const newOrder = { ...orderData, id: (Math.random() * 1000).toString() };
        const orders = await fs.readFile('./data/orders.json', 'utf8');
        const allOrders = JSON.parse(orders);
        allOrders.push(newOrder);
        await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
        res.status(201).json({ message: 'Order created!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
