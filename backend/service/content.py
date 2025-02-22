from db.supabase_repository import SupabaseRepository
from models.content import ContentRequest,ContentResponse,ContentUpdateRequest

class ContentService:
    def __init__(self):
        self.ContentRepository= SupabaseRepository[ContentRequest,ContentResponse]("scanned_content")
        self.ContentUpdateRepository = SupabaseRepository[ContentUpdateRequest,ContentResponse]("scanned_content")
        
    async def create_content(self,model:ContentRequest):
        try:
            data= await self.ContentRepository.create(model)
            return data
        except Exception as e:
            return None
        
    async def update_content_with_scores(self,model:ContentUpdateRequest,video_link:str):
        try:
            data = await self.ContentUpdateRepository.update_by_columns(column_values={"url":video_link},model=model)
            return data
        except Exception as e:
            return None
        
    async def get_content(self,content_type):
        try:
            data,count = await self.ContentRepository.get_by_query('prediction',content_type)
            return data,count
        except Exception as e:
            return None
        
    async def get_total_count(self):
        data,count = await self.ContentRepository.get_all()
        return count
    
    async def get_content_by_url(self, url):
        data,count = await self.ContentRepository.get_by_query("url", f"https://{url}")
        return data
        
    async def approve_content(self,model:ContentUpdateRequest,link:str):
        data = await self.ContentUpdateRepository.update_by_query('url',link,model)
        return data

        