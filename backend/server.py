import logging
import requests
import shutil
import sqlite3
import configparser

from telegram.ext import Updater, CommandHandler, MessageHandler, Filters

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

config = configparser.ConfigParser()
config.read('../telegram.config')

token = config['TELEGRAM']['token']


def getImage(update, context):
    """Download image sent by user"""
    logging.debug(f'Step 1: enter function')
    data = update.to_dict()

    try:
        update.message.reply_text('Hello')
        photo = data['message']['photo'][-1]
        file_id = photo['file_id']
        logging.debug(f'Step 1: file_id {file_id}')
        url = f'https://api.telegram.org/bot{token}/getFile?file_id={file_id}'

        logging.debug(f'Step 1.5: first url {url}')
        req = requests.get(
            f'{url}')
        file_path = req.json()['result']['file_path']
        logging.debug(f'Step 3: file_path {file_path}')

        with open(f'photos/{file_id}.png', 'wb') as local_file:
            url = f'https://api.telegram.org/file/bot{token}/{file_path}'
            logging.debug(f'Step 4: url  {url}')
            logging.debug(f'Saving {file_id}.png to {local_file}')
            photo_resp = requests.get(url, stream=True)
            photo_resp.raw.decode_content = True
            shutil.copyfileobj(photo_resp.raw, local_file)
            del photo_resp

        update.message.reply_text(f'Photo {url} found!')
    except:
        update.message.reply_text("No photo found in message")
        return

    # Save image to db with user id

    user = data['message']['from']['id']
    image_name = f'{file_id}.png'

    conn = sqlite3.connect('pics.db')
    cur = conn.cursor()
    cur.execute(f'INSERT INTO photos values ("{image_name}", "{user}")')
    conn.commit()
    conn.close()


def error(update, context):
    """Log Errors caused by Updates."""
    logger.warning('Update "%s" caused error "%s"', update, context.error)


def main():
    """Start the bot."""
    # Create the Updater and pass it your bot's token.
    # Make sure to set use_context=True to use the new context based callbacks
    # Post version 12 this will no longer be necessary
    updater = Updater(
        "812849484:AAHb2C4O08c2n3N8FFdRQosIeoBrdvWdfyU", use_context=True)

    # Get the dispatcher to register handlers
    dp = updater.dispatcher

    dp.add_handler(MessageHandler(Filters.photo, getImage))

    # log all errors
    dp.add_error_handler(error)

    # Start the Bot
    updater.start_polling()

    # Run the bot until you press Ctrl-C or the process receives SIGINT,
    # SIGTERM or SIGABRT. This should be used most of the time, since
    # start_polling() is non-blocking and will stop the bot gracefully.
    updater.idle()


if __name__ == '__main__':
    main()
