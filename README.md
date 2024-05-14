# Instagram Uploader Telegram Bot

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

This bot is for uploading Instagram reels from links directly to your account, with tags and interesting facts. You can change tags and descriptions inside of a project itself (as for now)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

To install the dependencies, run the following command:
npm i

Also, you'll need a .env file with your environment values:

IG_USERNAME: It's intended to store an Instagram username, but it needs to be filled in with an actual username (e.g. some_username).

IG_PASSWORD: It represents the password for an Instagram account (e.g. 123412SDavx£).

TELEGRAM_BOT_API_KEY: It appears to be an API key for a Telegram bot. You can get yours [here](https://t.me/BotFather) 

MY_ACCOUNT_ID: This value is for testing only, your Telegram user ID accepts messages only from you. 

GROQ_API: It's an API key or token for a service that uses the GROQ query language. GROQ is a query language commonly used with content management systems like Sanity.io.

## Usage

Symply go to your new bot and type /start command. After that, you can send him instagram reels and they'll be uploaded to your Instagram account with tags and random car fact from Groq. Feel free to change description on anything you like.

## License

This project is licensed under the [MIT License](LICENSE).
