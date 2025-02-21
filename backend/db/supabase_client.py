from supabase import acreate_client, AClient

from dotenv import load_dotenv
import os


load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


async def create_supabase_client() -> AClient:
    supabase: AClient = await acreate_client(SUPABASE_URL, SUPABASE_KEY)
    return supabase
