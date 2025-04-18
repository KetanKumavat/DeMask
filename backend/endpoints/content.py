from typing import List
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models.content import ContentResponse, ContentUpdateRequest
from service.content import ContentService
from pydantic import BaseModel

router = APIRouter()
content_service = ContentService()


class ApproveRequest(BaseModel):
    url: str
    timestamp: float


@router.get("/content")
async def get_deepfake_content():
    try:
        data, count = await content_service.get_content('DeepFake')
        total_count = await content_service.get_total_count()
        print(count)
        return JSONResponse(
            status_code=200,
            content={"data": data, "count": count, "total_count": total_count},
        )
    except Exception as e:
        return JSONResponse(status_code=500, content=str(e))


@router.post("/approve")
async def approve_content(data: ApproveRequest):
    try:
        response = await content_service.approve_content(
            ContentUpdateRequest(approved=True), link=data.url
        )
        return JSONResponse(status_code=200, content={"message": "Updated"})
    except Exception as e:
        return JSONResponse(status_code=500, content=str(e))
    
    
    
@router.get('/greyscale')
async def get_graysacle_content():
    try:
        response,count= await content_service.get_content('GreyScale')
        return JSONResponse(
            status_code=200,
            content={"response":response},
        )
    except Exception as e:
        return JSONResponse(status_code=500, content=str(e))

        

