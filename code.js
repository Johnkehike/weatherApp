const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request');

    // Get API keys from environment variables (configure these in Azure)
    const apiKeyWeatherstack = process.env.WEATHERSTACK_API_KEY;
    const apiKeyOpenweather = process.env.OPENWEATHER_API_KEY;

    // Get city from query parameters or request body
    const city = (req.query.city || (req.body && req.body.city));

    if (!city) {
        context.res = {
            status: 400,
            body: "Please provide a city name in the request"
        };
        return;
    }

    try {
        // Create API endpoints
        const weatherstackUrl = `http://api.weatherstack.com/current?access_key=${apiKeyWeatherstack}&query=${encodeURIComponent(city)}`;
        const openweatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKeyOpenweather}`;

        // Fetch from both APIs in parallel
        const [weatherstackResponse, openweatherResponse] = await Promise.all([
            fetch(weatherstackUrl),
            fetch(openweatherUrl)
        ]);

        const weatherstackData = await weatherstackResponse.json();
        const openweatherData = await openweatherResponse.json();

        // Combine results
        const result = {
            weatherstack: weatherstackData,
            openweather: openweatherData
        };

        context.res = {
            body: result
        };

    } catch (error) {
        context.log.error(`Error: ${error}`);
        context.res = {
            status: 500,
            body: "Error processing weather data"
        };
    }
};





