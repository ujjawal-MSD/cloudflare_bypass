# Tor Proxy Script

This project provides a script to fetch IP addresses through multiple Tor instances, effectively bypassing Cloudflare's rate limits. It uses SOCKS5 proxies from multiple Tor instances to rotate IP addresses, making it harder for Cloudflare to block requests from the same IP.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting Up Tor](#setting-up-tor)
- [Creating Tor Instances](#creating-tor-instances)
- [Installing Dependencies](#installing-dependencies)
- [Running the Script](#running-the-script)
- [Usage](#usage)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 12 or higher)
- **npm** (Node Package Manager)

## Installation

1. **Install Node.js**: Download and install Node.js from the [official website](https://nodejs.org/).
2. **Clone the Repository**:
   ```bash
   git clone https://github.com/ujjawalsol/cloudflare_bypass.git
   cd cloudflare_bypass
   ```

## Setting Up Tor

### Install Tor:

- **For Windows**: Download the Tor Browser from the [Tor Project website](https://www.torproject.org/).
- **For Linux**: Install Tor using your package manager. For example:
  ```bash
  sudo apt install tor
  ```
- **For macOS**: Use Homebrew:
  ```bash
  brew install tor
  ```

### Start the Tor Service:

- **On Linux/macOS**, run:
  ```bash
  tor &
  ```
- **On Windows**, start the Tor Browser and ensure it is running.

## Creating Tor Instances

To create multiple SOCKS proxy instances, you need to configure the `torrc` file:

1. Open your `torrc` file (usually located in `/etc/tor/torrc` on Linux or `C:\Users\<YourUsername>\AppData\Roaming\tor\torrc` on Windows).
2. Add the following lines to create multiple instances:

   ```text
   SocksPort 9050
   SocksPort 9052
   SocksPort 9054
   SocksPort 9056
   SocksPort 9058
   SocksPort 9060
   SocksPort 9062
   SocksPort 9064
   SocksPort 9066
   SocksPort 9068
   ```

3. Restart the Tor service for changes to take effect.

   ```bash
    sudo systemctl restart tor
   ```

## Installing Dependencies

Navigate to your project directory and install the required packages:

```bash
npm install
```

This command will install all necessary dependencies listed in `package.json`.

## Running the Script

To run the script, use the following command in your terminal:

```bash
npm start
```

Make sure that your Tor service is running before executing this command.

## Usage

The script will automatically fetch and print IP addresses from multiple Tor instances. You can monitor the output in your terminal.

### Example Output

```text
[2024-11-11T11:21:43.340Z] Updated IPs in this cycle:
Instance 1 (SOCKS Port 9050): New IP is 185.241.208.115
Instance 2 (SOCKS Port 9052): New IP is 103.251.167.10
Instance 3 (SOCKS Port 9054): New IP is 185.220.101.69
Instance 4 (SOCKS Port 9056): New IP is 192.42.116.180
Instance 5 (SOCKS Port 9058): New IP is 185.244.192.184
Instance 6 (SOCKS Port 9060): New IP is 45.134.225.36
Instance 7 (SOCKS Port 9062): New IP is 23.153.248.34
Instance 8 (SOCKS Port 9064): New IP is 185.100.87.253
Instance 9 (SOCKS Port 9066): New IP is 192.42.116.215
Instance 10 (SOCKS Port 9068): New IP is 199.195.250.18
Current IPs: [
  '185.241.208.115',
  '103.251.167.10',
  '185.220.101.69',
  '192.42.116.180',
  '185.244.192.184',
  '45.134.225.36',
  '23.153.248.34',
  '185.100.87.253',
  '192.42.116.215',
  '199.195.250.18'
]
```

## Limitations

- **Rate Limiting**: While this script helps bypass Cloudflare's rate limits, excessive requests may still lead to blocks.
- **Ethical Use**: Always respect the terms of service of websites you are accessing.
- **IP Blocking**: Frequent access attempts may lead to IP blacklisting. Consider using rotating proxies for safer operations.

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to report issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
