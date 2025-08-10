import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import schoolRoutes from './routes/schoolRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/healthz', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api', schoolRoutes);

app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
    });
});

app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        status: 'error',
        message: 'Server error',
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
