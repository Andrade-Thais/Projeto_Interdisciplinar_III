import os
from redmail import outlook, EmailSender
from dotenv import load_dotenv

load_dotenv()

outlook.user_name = os.getenv('OUTLOOK_EMAIL')
outlook.password = os.getenv('OUTLOOK_PASSWORD')

