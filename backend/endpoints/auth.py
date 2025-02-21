from datetime import timedelta
from fastapi import APIRouter, Request, Response
from fastapi.responses import JSONResponse

from db.supabase_repository import SupabaseRepository
from models.user import AuthUserRequest, UserRequest, UserUpdateRequest
from service.user import UserService


auth_router = APIRouter()
Auth = SupabaseRepository("user_settings")
user_service = UserService()


@auth_router.post("/signup")
async def signup(request: AuthUserRequest):
    try:
        response = await Auth.sign_up(request.email,request.password)
        if response.get("error"):
            return JSONResponse(content=response, status_code=500)
        user=UserRequest(
            id=response.get('user'),
            name=request.name,
            primary_contacts=request.primary_contacts,
            email=request.email
        )
        await user_service.create_user(user)
        return JSONResponse(content=response, status_code=201)
    except Exception as e:
        return JSONResponse(content=e, status_code=500)
        


@auth_router.post("/signin")
async def signin(request: Request, response: Response):
    body = await request.json()
    response_data = await Auth.sign_in(body["email"], body["password"])

    if response_data.get("error"):
        return JSONResponse(content=response_data, status_code=401)
    access_token, refresh_token = response_data.get("access_token"), response_data.get(
        "refresh_token"
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=timedelta(days=7),
        httponly=True,
        secure=False,
        samesite="Strict",
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        max_age=timedelta(days=100),
        httponly=True,
        secure=False,
        samesite="Strict",
    )
    return JSONResponse(content={"messsage": "Sign-in successful"}, status_code=200)
