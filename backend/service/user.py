from db.supabase_repository import SupabaseRepository
from models.user import UserRequest, UserUpdateRequest, UserResponse


class UserService:
    def __init__(self):
        self.UserRepository = SupabaseRepository[UserRequest, UserResponse](
            "users"
        )

    async def create_user(self, user: UserRequest):
        try:
            data = await self.UserRepository.create(
                model=user
            )
            return data
        except Exception as e:
            print(e)
            return None
        
    async def get_user(self, user_id: str):
        try:
            data = await self.UserRepository.get_by_id(user_id)
            return data
        except Exception as e:
            print(e)
            return None
        
