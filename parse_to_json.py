import json
import os
import glob

from PIL import Image


for image_file in glob.glob('./animals/*/*.png'):
    *_, animal, action = os.path.split(image_file)
    action, _ = action.split('.', maxsplit=1)
    img = Image.open(image_file)
    
    width = img.width
    height = img.height
    frames = []
    for i, x in enumerate(range(0, width, height)):
        frame = {
            "name": f'{animal}_{action}_{i}',
            "position": {
                "x": x,
                "y": 0,
                "w": height,
                "h": height
            }
        }
        
        frames.append(frame)
    
    out_dir = os.path.dirname(image_file)
    
    with open(f'{out_dir}/{action}.json', 'w') as out:
        json.dump({'frames': frames}, out)

