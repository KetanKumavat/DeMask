from fastapi import FastAPI
from endpoints.auth import auth_router
from ml.socket import router as ml_router
from fastapi.middleware.cors import CORSMiddleware


app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router,prefix='/auth')
app.include_router(ml_router,prefix='/ml')


@app.get('/')
def home_route():
    return {"message":"Backend is running"}