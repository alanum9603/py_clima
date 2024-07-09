import os
from dotenv import load_dotenv  # Instalar con pip install python-dotenv

load_dotenv()  # Carga todo el contenido de .env en variables de entorno

class Config:
    SERVER_NAME = "localhost:7001"
    DEBUG = True

    API_KEY = os.environ.get("API_KEY", "")

    TEMPLATE_FOLDER = "views/templates/"
    STATIC_FOLDER = "views/static/"