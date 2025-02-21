from typing import Optional
from supabase import AClient
from .supabase_client import create_supabase_client
from typing import TypeVar, Generic, Optional, List, Any, Dict, Tuple
from pydantic import BaseModel
from asyncio.log import logger


T = TypeVar("T", bound=BaseModel)
K = TypeVar("K", bound=BaseModel)
class SupabaseRepository(Generic[T, K]):
    
    client:Optional[AClient]=None
    
    def __init__(self,table:str):
        self.table=table
        
        
    @classmethod
    async def get_client(cls):
        if not cls.client:
            cls.client = await create_supabase_client()
        return cls.client

    
    
    async def sign_up(self,email,password):
        supabase= await self.get_client()
        response=await supabase.auth.sign_up({"email":email,"password":password})
        response=response.model_dump()
        print(type(response))
        print(response)
       
        if response.get('user'):
            print("Inside if ")
            user_id=response['user']['id']
            return {
                "user":response['user']['id'],
            }
        else:
            return {
                "error":response.get('error',"Signup Failed")
            }
            
    async def sign_in(self,email,password):
        supabase= await self.get_client()
        response=await supabase.auth.sign_in_with_password({"email":email,"password":password})
        response= response.model_dump()
        if response.get('user'):
            session=response.get('session')
            print("Inside if")
            return {
                "user":response['user']['id'],
                "access_token":session.get('access_token'),
                "refresh_token":session.get('refresh_token'),
                # "expires_in":session.get('expires_in')
            }
        else:
            return {
                "error":response.get('error',"Signup Failed")
            }
    
    async def logout(self, access_token: str):
        supabase = await self.get_client()
        response = await supabase.auth.logout()
        if response.get('error'):
            return {"error": response['error']}
        return {"message": "Successfully logged out"}
    
    
    async def create(self,model:T)->K:
        try:
            supabase=await self.get_client()
            data=model.model_dump()
            response=await supabase.table(self.table).insert(data).execute()
            return response.data
        except Exception as e:
            print("Error occured while creating record",e)
            
            
    async def create_if_not_exists(
            self, model: T, unique_column: str, unique_value: Any
    ) -> Optional[K]:
        try:
            supabase=await self.get_client()
            data = model.model_dump()
            existing_data =await (
                supabase.table(self.table)
                .select("*")
                .eq(unique_column, unique_value)
                .execute()
            )
            if existing_data and existing_data.data:
                print("Data already exists")
                return existing_data.data[0] if existing_data.data else None

            response = supabase.table(self.table).insert(data).execute()
            data = response.data
            return data[0] if data else None
        except Exception as e:
            print(f"Create Error: {e}")
            return None

        
    async def get_by_id(self, _id: str) -> Optional[K]:
        try:
            supabase=await self.get_client()
            response = await supabase.table(self.table).select("*").eq("id", _id).execute()
            data = response.data
            if not data:
                logger.info(f"No data found in {self.table} for id {_id}")
                return None
            return data[0]
        except Exception as e:
            logger.error(f"Get Error in table {self.table} at get_by_id: {e}")
            print(f"Get Error at get_by_id: {e}")
            return None

    async def get_by_query(self, column_name: str, value: Any) -> Optional[K]:
        try:
            supabase=await self.get_client()
            response = await supabase.table(self.table).select("*").eq(column_name, value).execute()
            
            data = response.data
            return data[0] if data else None
        except Exception as e:
            print(f"Get Error at get_by_query: {e}")
            return None
        
    async def update_by_id(self, _id: str, model: T):
        try:
            supabase=await self.get_client()
            data = model.model_dump(exclude_unset=True)
            response = await supabase.table(self.table).update(data).eq("id", _id).execute()
            data = response.data
            return {"response": "success"}
        except Exception as e:
            logger.error(f"Update Error in table {self.table} at update_by_id: {e}")
            print(f"Update Error at update_by_id: {e}")
            return None
        
    async def update_by_query(self, column_name: str, value, model: T):
        try:
            data = model.model_dump(exclude_unset=True)
            supabase = await self.get_client()
            response = await supabase.table(self.table).update(data).eq(column_name, value).execute()
            data = response.data
            print(data)
            return {"response": "success"}
        except Exception as e:
            print(f"Update Error: {e}")
            return None
        
    async def update_by_columns(self, column_values: Dict[str, Any], model: T) -> Optional[T]:
        try:
            supabase = await self.get_client()
            data = model.model_dump(exclude_unset=True)
            query = await supabase.table(self.table).update(data)
            for column, value in column_values.items():
                query = query.eq(column, value)
            response = query.execute()
            data = response.data
            return model.model_validate(data[0]) if data else None
        except Exception as e:
            print(f"Update Error at update_by_columns: {e}")
            return None
        
    async def delete_by_id(self, _id: str) -> bool:
        try:
            supabase = await self.get_client()
            response = await supabase.table(self.table).delete().eq("id", _id).execute()
            _ = response.data
            return True
        except Exception as e:
            print(f"Delete Error: {e}")
            return False

    async def delete_by_query(self, query_column, query_value):
        try:
            supabase = await self.get_client()
            response =await (
                supabase.table(self.table)
                .delete()
                .eq(query_column, query_value)
                .execute()
            )
            _ = response.data
            return True
        except Exception as e:
            return False
            
        