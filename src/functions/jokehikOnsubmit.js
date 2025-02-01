const { app } = require('@azure/functions');
const fetch = require('node-fetch');
const weatherkey = '420708b7232891c1b664d5c6df59df36';
const openweath =`170f9d306b8b1fff0fa64a3d4b8708c7`;
app.http('submitForm', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Processing weather request for "${request.url}"`);

        try {
            // Get API keys from environment variables
            const weatherstackKey = weatherkey //process.env.WEATHERSTACK_API_KEY;
            const openweatherKey = openweath // process.env.OPENWEATHER_API_KEY;
            
            // Get city from query parameters
            const city = request.query.get('city');
            console.log(city);
            
            
            if (!city) {
                return {
                    status: 400,
                    jsonBody: { error: "City parameter is required" },
                    headers: { 'Access-Control-Allow-Origin': '*' }
                };
            }

            // Create API endpoints
            const weatherstackUrl = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${encodeURIComponent(city)}`;
            const openweatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${openweatherKey}`;

            // Fetch from both APIs in parallel
            const [weatherstackRes, openweatherRes] = await Promise.all([
                fetch(weatherstackUrl),
                fetch(openweatherUrl)
            ]);

            // Handle API errors
            if (!weatherstackRes.ok || !openweatherRes.ok) {
                throw new Error('One or more API requests failed');
            }

            const [weatherstackData, openweatherData] = await Promise.all([
                weatherstackRes.json(),
                openweatherRes.json()
            ]);

            return {
                jsonBody: {
                    weatherstack: weatherstackData,
                    openweather: openweatherData
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            };

        } catch (error) {
            context.error(`Error: ${error.message}`);
            return {
                status: 500,
                jsonBody: { error: "Internal server error" },
                headers: { 'Access-Control-Allow-Origin': '*' }
            };
        }
    }
});






// const { app } = require('@azure/functions');

// app.http('jokehikOnsubmit', {
//     methods: ['GET', 'POST'],
//     authLevel: 'anonymous',
//     handler: async (request, context) => {
//         context.log(`Http function processed request for url "${request.url}"`);

//         const name = request.query.get('name') || await request.text() || 'world';

//         return { body: `Hello, ${name}!` };
//     }
// });
