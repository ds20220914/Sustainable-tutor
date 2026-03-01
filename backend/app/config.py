from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    infomaniak_api_url: str
    infomaniak_token: str
    allowed_origins: list[str] = ["http://localhost:5173"]

    class Config:
        env_file = ".env"

settings = Settings()