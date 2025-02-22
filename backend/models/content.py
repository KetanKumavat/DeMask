from pydantic import BaseModel
from typing import Optional

class ContentRequest(BaseModel):
    url:str
    prediction:Optional[str]=None
    score:Optional[float]=None
    timestamp:float
    approved:Optional[bool]=False
    
class ContentResponse(ContentRequest):
    id:str
    
class ContentUpdateRequest(BaseModel):
    url:Optional[str]=None
    prediction:Optional[str]=None
    score:Optional[float]=None
    timestamp:Optional[float]=None
    approved:Optional[bool]=False