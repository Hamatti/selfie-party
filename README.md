# Selfie Party Game

## Introduction

This project is a prototype of a selfie game to be played in events. There's a list of tasks your participants need to take selfies with to encourage getting to know each other. Current version does not track which of posted photos correspond with which task.

The posted pictures can then be shown on a bigger screen at the event so people can see the selfies.

## How to run?

### Prerequisites

Python 3.7

### Configuration

To get Telegram connection working, you will need to [create a Telegram bot](https://core.telegram.org/bots). Once you get your API token from BotFather (Telegram's bot configuration tool), copy file `telegram.config.sample` to `telegram.config` and replace `YOUR_TOKEN_HERE` with the token you got from Telegram.

After that, you need to create `backend/tasks.md` file with instructions you want your users to see when they start.

### Running servers

You will need to run three commands in separate windows:

**Python API to serve photos**

```
cd backend
source env/bin/activate
python3.7 api.py
```

**Telegram listener to save photos**

```
cd backend
source env/bin/activate
python3.7 server.py
```

**Frontend dev server**

```
cd frontend
yarn start
```

After you have all of those running without errors, you can open http://localhost:3000 in your browser. Clicking the title of the page "SELFIE PARTY 🎉", you will get access to an image size slider that can help you adjust the picture sizes to best match your screen.
