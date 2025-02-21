from pydantic import BaseModel
from typing import Dict, List, Optional


class UserRequest(BaseModel):
    id:Optional[str]=None
    name: str
    email: str
    
class AuthUserRequest(UserRequest):
    password:str


class UserResponse(UserRequest):
    pass


class UserUpdateRequest(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    reputation: Optional[int] = 10
