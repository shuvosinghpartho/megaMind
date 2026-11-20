import sys
from PIL import Image
from rembg import remove

input_path = '/Users/methun/Projects/MegaMind/megamind-site/public/assets/human-brain-profile.jpg'
output_path = '/Users/methun/Projects/MegaMind/megamind-site/public/assets/human-brain-profile.png'

print(f"Loading {input_path}...")
input_image = Image.open(input_path)

print("Removing background with AI model...")
output_image = remove(input_image)

print(f"Saving transparent PNG to {output_path}...")
output_image.save(output_path, "PNG")

print("Done! Transparent image saved successfully.")
