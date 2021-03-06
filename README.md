<div align="center">
  <p>
    <img src="assets/images/README_banner.png" raw=true width="400" alt="Munch Bot Banner">
  </p>
  <strong>$Munch market data and general information at your fingertips</strong>
</div>
<hr />

## About

Munch Bot is a Discord bot that assists the Munch Donaton Project's official Discord server.

## 🚀 Getting Started

### Requirements

- [Discord Bot Token](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
- [Discord User ID](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
- [Etherscan API Key](https://info.etherscan.com/api-keys/)
- [Ethplorer API Key](https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API)

### Installation

```bash
# Clone the repository
$ git clone https://github.com/dxnter/munch-bot

# Enter into the directory
$ cd munch-bot

# Install dependencies
$ npm install
```

### Setup

Rename `config.example.json` to `config.json` in the root directory and enter in the correct information for each property.

`EMBED_COLOR` can either be left as the default or changed to a valid hex color code.

`OWNERS` can either be a single Discord User ID or multiple ID's separated by a comma. Owners will have complete control over Munch Bot and bypass command throttling.

```json
{
  "EMBED_COLOR": "#e6007a",
  "OWNERS": ""
}
```

Rename `.env.example` to `.env` in the root directory and enter in the correct information for each property.

```env
DISCORD_BOT_TOKEN=
ETHERSCAN_API_KEY=
ETHPLORER_API_KEY=
```

## Running the bot

```bash
$ npm start
```

### Advanced

This section is completely optional but suggested if hosting Munch Bot on a VPS.
Globally install `pm2`, this enables Munch Bot to run as a daemon process.

```bash
$ npm install -g pm2
```

Start / Stop

```bash
$ pm2 start npm -- start

$ pm2 stop all
```

## License

Released under the [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html) license.
