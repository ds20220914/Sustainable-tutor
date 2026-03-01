from fastapi import APIRouter, HTTPException
from app.models.schemas import GenerateRequest, GenerateResponse
from app.services.prompt_builder import build_prompt
from app.services.euria_client import call_euria, EuriaAPIError

router = APIRouter(prefix="/api", tags=["generate"])

@router.post("/generate", response_model=GenerateResponse)
async def generate_content(req: GenerateRequest):
    prompt = build_prompt(req)

    try:
        content = await call_euria(prompt)
    except EuriaAPIError as e:
        # Infomaniak returned result: error — expose their error code to the client
        raise HTTPException(status_code=502, detail={"code": e.code, "message": e.description})
    except Exception as e:
        # Network failure, timeout, unexpected shape, etc.
        raise HTTPException(status_code=502, detail={"code": "upstream_error", "message": str(e)})

    return GenerateResponse(
        content=content,
        exercise_type=req.exercise_types[0],
        topic=req.topic,
    )