from fastapi import FastAPI
from endpoints.auth import auth_router
from ml.socket import router as ml_router
from endpoints.content import router as content_router
from fastapi.middleware.cors import CORSMiddleware
from ml.adverserial import router as poison_router

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router,prefix='/auth')
app.include_router(content_router,prefix='/deepfake')
app.include_router(ml_router,prefix='/ml')
app.include_router(poison_router,prefix='/poison')




@app.get('/')
def home_route():
    return {"message":"Backend is running"}