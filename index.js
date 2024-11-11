const axios = require('axios');
const { SocksProxyAgent } = require('socks-proxy-agent');

// Configuration for Tor instances
const torInstances = [
    { instanceId: 1, socksPort: 9050 },
    { instanceId: 2, socksPort: 9052 },
    { instanceId: 3, socksPort: 9054 },
    { instanceId: 4, socksPort: 9056 },
    { instanceId: 5, socksPort: 9058 },
    { instanceId: 6, socksPort: 9060 },
    { instanceId: 7, socksPort: 9062 },
    { instanceId: 8, socksPort: 9064 },
    { instanceId: 9, socksPort: 9066 },
    { instanceId: 10, socksPort: 9068 },
];

// Array to store current IP addresses for each instance
let currentIps = Array(torInstances.length).fill(null);

// Configuration options
const CONFIG = {
    REQUEST_TIMEOUT: 5000,
    RETRY_ATTEMPTS: 3,
    INITIAL_DELAY_MS: 1000,
    UPDATE_INTERVAL_MS: 2000,
};

// Function to create a SOCKS proxy agent
const createSocksAgent = (socksPort) => {
    return new SocksProxyAgent(`socks5h://127.0.0.1:${socksPort}`);
};

// Function to get the current IP address using Tor with retry logic
const getTorIp = async (socksPort) => {
    const agent = createSocksAgent(socksPort);

    for (let attempt = 1; attempt <= CONFIG.RETRY_ATTEMPTS; attempt++) {
        try {
            const response = await axios.get('https://api.ipify.org?format=json', {
                httpAgent: agent,
                httpsAgent: agent,
                timeout: CONFIG.REQUEST_TIMEOUT,
            });
            return response.data.ip; // Return the fetched IP
        } catch (error) {
            console.error(`[Attempt ${attempt}] Error fetching IP from port ${socksPort}: ${error.message}`);
            if (attempt === CONFIG.RETRY_ATTEMPTS) {
                return null; // Return null after all attempts fail
            }
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, CONFIG.INITIAL_DELAY_MS));
    }
};

// Function to update the IP for a specific instance
const updateIpForInstance = async (instance) => {
    const newIp = await getTorIp(instance.socksPort); // Fetch new IP
    if (newIp) {
        currentIps[instance.instanceId - 1] = newIp; // Update the current IP array
        return `Instance ${instance.instanceId} (SOCKS Port ${instance.socksPort}): New IP is ${newIp}`;
    } else {
        return `Instance ${instance.instanceId} (SOCKS Port ${instance.socksPort}): Failed to fetch new IP.`;
    }
};

// Function to fetch and print initial IPs for all instances with delays
const fetchInitialIps = async () => {
    for (const instance of torInstances) {
        const logMessage = await updateIpForInstance(instance);
        console.log(logMessage);

        // Introduce a small delay between requests to avoid fetching same IPs
        await new Promise(resolve => setTimeout(resolve, CONFIG.INITIAL_DELAY_MS));
    }
};

// Function to continuously update IPs in the background with delays
const startUpdatingIps = () => {
    setInterval(async () => {
        const logMessages = await Promise.all(torInstances.map(instance => updateIpForInstance(instance)));

        // Clear previous logs and print updated logs in one go
        console.clear();
        console.log(`[${new Date().toISOString()}] Updated IPs in this cycle:\n`, logMessages.join('\n'));

        console.log('Current IPs:', currentIps);
    }, CONFIG.UPDATE_INTERVAL_MS); // Adjust interval as needed (e.g., every 2 seconds)
};

// Graceful shutdown function
const shutdown = () => {
    console.log('\nShutting down gracefully...');
    process.exit(0);
};

// Main function to orchestrate fetching and updating of IPs
const main = async () => {
    await fetchInitialIps(); // Fetch and print initial IPs
    startUpdatingIps(); // Start background updates

    // Listen for termination signals to shut down gracefully
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
};

// Start the process
main().catch(error => {
    console.error('An error occurred in the main process:', error);
});