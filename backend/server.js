const express = require('express');
const cors = require('cors');
const { getEngine } = require('./engine');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoint
app.post('/api/calculate', (req, res) => {
    try {
        const { newspaper, adText, boldWords } = req.body;

        if (!newspaper || !adText) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters: newspaper and adText are required.'
            });
        }

        // Parse bold words if passed as a comma-separated string instead of array
        let parsedBoldWords = [];
        if (Array.isArray(boldWords)) {
            parsedBoldWords = boldWords;
        } else if (typeof boldWords === 'string') {
            parsedBoldWords = boldWords.split(',').map(w => w.trim()).filter(w => w !== '');
        }

        // Instantiate the correct engine
        const engine = getEngine(newspaper);
        
        if (!engine) {
            return res.status(400).json({
                success: false,
                error: `Engine not found for newspaper: ${newspaper}`
            });
        }

        // Calculate layout
        const layoutData = engine.calculateLayout(adText, parsedBoldWords);
        
        const responseData = {
            success: true,
            newspaper: newspaper,
            physicalLines: layoutData.linesCount,
            layoutDetails: layoutData.layout, // Optional, can be removed if strictly not needed
            ratePerLine: engine.RATE_PER_LINE || null
        };

        // Determine calculation type (words vs lines)
        if (typeof engine.calculateBilledWords === 'function') {
            responseData.calculationType = 'words';
            responseData.billedWords = engine.calculateBilledWords(adText);
            responseData.billedLines = null;
        } else {
            responseData.calculationType = 'lines';
            responseData.billedWords = null;
            responseData.billedLines = engine.calculateBilledLines(adText);
        }

        return res.json(responseData);

    } catch (error) {
        console.error('Calculation Error:', error);
        return res.status(500).json({
            success: false,
            error: 'An internal error occurred during calculation.'
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Universal Line Calculator API running at http://localhost:${PORT}`);
});
