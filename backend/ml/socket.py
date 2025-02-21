from ml.mesonet import Meso4
import cv2
import numpy as np

classifier = Meso4()
classifier.load("weights/Meso4_DF.h5")


def predict_single_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (256, 256))
    img = img.astype(np.float32) / 255.0
    img = np.expand_dims(img, axis=0)
    prediction = classifier.predict(img)
    result="DeepFake"
    if prediction[0][0]>95:
        result="Real"
    print(prediction)
    return {"image":image_path,"result":result}

