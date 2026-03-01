import httpx
from app.config import settings

class EuriaAPIError(Exception):
    """Raised when Infomaniak returns result: error"""
    def __init__(self, code: str, description: str):
        self.code = code
        self.description = description
        super().__init__(f"[{code}] {description}")


async def call_euria(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {settings.infomaniak_token}",
        "Content-Type": "application/json",
    }

    # Adjust the path and payload fields once you have the exact AI endpoint docs
    payload = {
        "messages": [
            {"role": "user", "content": prompt}
        ],
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            f"{settings.infomaniak_api_url}/1/ai/euria/completions",  # confirm exact path
            json=payload,
            headers=headers,
        )
        response.raise_for_status()  # handles 4xx/5xx at HTTP level

    data = response.json()

    # Handle Infomaniak's envelope
    if data.get("result") == "error":
        error = data.get("error", {})
        code        = error.get("code", "unknown_error")
        description = error.get("description", "No description provided")

        # Log sub-errors if present (e.g. validation_failed with multiple errors)
        sub_errors = error.get("errors", [])
        if sub_errors:
            details = "; ".join(f"{e['code']}: {e['description']}" for e in sub_errors)
            description = f"{description} — {details}"

        raise EuriaAPIError(code=code, description=description)

    # result == "success"
    response_data = data.get("data", {})

    # Extract the generated text — adjust key to match actual Euria response shape
    return response_data.get("content") or response_data.get("text") or str(response_data)