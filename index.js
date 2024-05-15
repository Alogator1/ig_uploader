import instagramDl  from '@sasmeee/igdl';
import dotenv from "dotenv";
import Groq from 'groq-sdk';
import { IgApiClient } from "instagram-private-api";
import TelegramBot from "node-telegram-bot-api";
import get from 'request-promise';
import axios from 'axios';

dotenv.config();

const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;
const telegramBot = new TelegramBot(TELEGRAM_BOT_API_KEY, { polling: true });

telegramBot.onText(/\/start/, (msg) => {
  telegramBot.sendMessage(msg.chat.id, `Welcome ${msg.chat.first_name}`);
});

telegramBot.onText(/instagram.com\/reel/, async (msg) => {
  if(msg.from.id == process.env.MY_ACCOUNT_ID) {
    const dataList = await instagramDl(msg.text);
    const ig = new IgApiClient();

    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    const author = await getInstagramReelAuthor(msg.text);

    await telegramBot.sendMessage(msg.chat.id, `Downloading ${JSON.stringify(dataList)} files...`);

    const video = await get({
      url: dataList[0].download_link,
      encoding: null, 
    });

    const coverImage = await get({
      url: dataList[0].thumbnail_link,
      encoding: null, 
    });

    await telegramBot.sendMessage(msg.chat.id, `Got files`);

    const groq = new Groq({
      apiKey: process.env.GROQ_API
    });

    const res = await groq.chat.completions.create({
      messages: [
          {
              role: "user",
              content: "Generate one interesting fact about cars without any external message"
          }
      ],
      model: "llama3-8b-8192"
    });

    await ig.publish.video({
      video,
      coverImage,
      caption: `${res?.choices[0]?.message?.content}\n\nStolen from: @${author}\n\n#MemeMonday #FunnyFridays #LOL #Humor #DailyLaughs #MemeMagic #ViralVibes #LaughOutLoud #ComedyGold #HilariousMoments #fyp #meme`,
    });

    await telegramBot.sendMessage(msg.chat.id, `Files uploaded!`);
  } else {
    telegramBot.sendMessage(msg.chat.id, `You are not allowed to use this bot.`);
  }
});

async function getInstagramReelAuthor(reelUrl) {
  try {
      const { data } = await axios.get(reelUrl);

      // Extract the meta tag content
      const metaTagRegex = /<meta property="og:description" content="([^"]+)"/;
      const match = metaTagRegex.exec(data);

      if (match && match[1]) {
          const content = match[1];
          // Extract the username using regex
          const usernameRegex = /- ([^ ]+) on/;
          const usernameMatch = usernameRegex.exec(content);

          if (usernameMatch && usernameMatch[1]) {
              const username = usernameMatch[1].trim();
              return username;
          } else {
              console.error('Username not found in the meta tag content');
              return null;
          }
      } else {
          console.error('Meta tag not found');
          return null;
      }
  } catch (error) {
      console.error('Error fetching the URL:', error.message);
      return null;
  }
}