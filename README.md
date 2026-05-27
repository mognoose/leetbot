# LeetBot

Discord bot that awards points for messages sent at **13:37** containing the word "leet".

## Features

- Awards 1 point per user per day for messages at 13:37 with "leet"
- Leaderboard via `!leet` command
- Persistent score storage (JSON file)
- TypeScript + discord.js v14

## Setup

1. **Create a Discord bot:**
   - Go to https://discord.com/developers/applications
   - Create New Application → Add Bot
   - Enable **Message Content Intent** under Bot → Privileged Gateway Intents
   - Copy the bot token

2. **Invite bot to your server:**
   - OAuth2 → URL Generator
   - Scopes: `bot`
   - Bot Permissions: `Read Messages/View Channels`, `Send Messages`, `Add Reactions`
   - Copy URL and paste in browser

3. **Configure:**
   ```bash
   cp .env.example .env
   # Edit .env and paste your bot token
   ```

4. **Install & run:**
   ```bash
   npm install
   npm run dev    # development
   npm run build  # production build
   npm start      # run production build
   ```

## Deployment (Render - Free)

1. Push code to GitHub
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment Variable:** `DISCORD_TOKEN` = your bot token
5. Deploy!

**Note:** Render free tier spins down after 15min inactivity. Since scoring only happens at 13:37, set up a free cron job at https://cron-job.org to ping your Render URL daily at 13:36 to wake the bot.

## Commands

- `!leet` - Show the leaderboard

## How it works

- Bot checks every message for:
  1. Time is exactly 13:37 (server time)
  2. Message contains "leet" (case-insensitive)
- Awards 1 point per user per day (max 1/day)
- React with ✅ on successful leet detection
