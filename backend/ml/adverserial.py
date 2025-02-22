import io
import numpy as np
from fastapi import APIRouter,  File, UploadFile
from fastapi.responses import StreamingResponse
from PIL import Image
import torch
import torchvision.transforms as transforms
import foolbox as fb
import eagerpy as ep

router = APIRouter()

def generate_adversarial_image(pil_image: Image.Image, epsilon: float = 0.03) -> Image.Image:

    to_tensor = transforms.ToTensor()
    tensor_image = to_tensor(pil_image).unsqueeze(0)  # shape: (1, C, H, W)

    model = torch.hub.load('pytorch/vision:v0.10.0', 'resnet18', pretrained=True)
    model.eval()
    fmodel = fb.models.PyTorchModel(model, bounds=(0, 1))
    
    with torch.no_grad():
        prediction = model(tensor_image)
    label = torch.argmax(prediction, dim=1)
    
    attack = fb.attacks.FGSM()
    raw_adv, clipped_adv, success = attack(fmodel, ep.astensor(tensor_image), label, epsilons=[epsilon])
    
    adv_tensor = clipped_adv[0].squeeze(0)  
    
    adv_np = adv_tensor.numpy()
    
    if adv_np.ndim == 3 and adv_np.shape[0] in {1, 3, 4}:
        adv_np = np.transpose(adv_np, (1, 2, 0))
    
    adv_np = (adv_np * 255).clip(0, 255).astype(np.uint8)
    
    adv_image = Image.fromarray(adv_np)
    return adv_image

@router.post("/adversarial")
async def adversarial_endpoint(file: UploadFile = File(...)):

    contents = await file.read()
    input_image = Image.open(io.BytesIO(contents)).convert("RGB")
    

    adv_image = generate_adversarial_image(input_image, epsilon=0.03)
    
    buf = io.BytesIO()
    adv_image.save(buf, format="JPEG")
    buf.seek(0)
    
    return StreamingResponse(buf, media_type="image/jpeg")




