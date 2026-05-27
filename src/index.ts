require('dotenv').config();
import { Client, IntentsBitField, Message } from 'discord.js';
import { addScore, getAllScores } from './scoreManager';
import { isLeetTime, containsLeet } from './utils';

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.startsWith('!leet')) {
    const scores = getAllScores();
    if (scores.length === 0) {
      message.reply('No leet points scored yet!').catch(console.error);
      return;
    }
    const leaderboard = scores
      .map((user, idx) => `${idx + 1}. **${user.username}**: ${user.score} point${user.score !== 1 ? 's' : ''}`)
      .join('\n');
    message.reply(`**🏆 Leet Leaderboard 🏆**\n${leaderboard}`).catch(console.error);
    return;
  }

  if (isLeetTime() && containsLeet(message.content)) {
    const { score, added } = addScore(message.author.id, message.author.username);
    if (added) {
      message.react('✅').catch(console.error);
      console.log(`Awarded point to ${message.author.username} (total: ${score})`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN).catch(console.error);
