import * as fs from 'fs';
import * as path from 'path';

interface UserScore {
  userId: string;
  username: string;
  score: number;
  lastScoreDate: string | null;
}

interface ScoresData {
  [userId: string]: UserScore;
}

const DATA_DIR = path.join(__dirname, '../data');
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadScores(): ScoresData {
  ensureDataDir();
  if (!fs.existsSync(SCORES_FILE)) {
    return {};
  }
  const data = fs.readFileSync(SCORES_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveScores(scores: ScoresData): void {
  ensureDataDir();
  fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
}

export function getScore(userId: string): UserScore | undefined {
  const scores = loadScores();
  return scores[userId];
}

export function addScore(userId: string, username: string): { score: number; added: boolean } {
  const scores = loadScores();
  const today = new Date().toISOString().split('T')[0];

  if (!scores[userId]) {
    scores[userId] = { userId, username, score: 0, lastScoreDate: null };
  }

  if (scores[userId].lastScoreDate === today) {
    return { score: scores[userId].score, added: false };
  }

  scores[userId].score += 1;
  scores[userId].lastScoreDate = today;
  scores[userId].username = username;
  saveScores(scores);

  return { score: scores[userId].score, added: true };
}

export function getAllScores(): UserScore[] {
  const scores = loadScores();
  return Object.values(scores).sort((a, b) => b.score - a.score);
}
