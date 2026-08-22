from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "DocSync AI Parser Service"
    PORT: int = 8000
    DEBUG: bool = True

    class Config:
        env_file = ".env"

settings = Settings()