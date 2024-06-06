import os
import shutil

import code128
from PIL import Image, ImageDraw, ImageFont

u_d_margin = 25

h2_size = 30
h2_font = ImageFont.truetype("./arial.ttf", h2_size)


def create_folder(request_id):
    path = f'{os.getcwd()}/{request_id}'
    os.makedirs(path,
                exist_ok=True)
    print(f'Folder {path} for RQ {request_id} created.')


def create_image(request_id, barcode_text):
    barcode_image = code128.image(barcode_text, height=125)
    new_height = barcode_image.height + (3 * u_d_margin)
    new_width = barcode_image.width
    center_barcode_value = (barcode_image.width / 2) - len(barcode_text) * 8
    new_image = Image.new(
        'RGB',
        (new_width, new_height),
        (255, 255, 255)
    )
    new_image.paste(
        barcode_image,
        (0, u_d_margin)
    )
    draw = ImageDraw.Draw(new_image)
    draw.text(
        xy=(center_barcode_value, (new_height - 2 * u_d_margin)),
        text=barcode_text,
        fill=(0, 0, 0),
        font=h2_font
    )
    new_image.save(f'{os.getcwd()}/{request_id}/{barcode_text}.png', 'PNG')
    print(barcode_text + ' generated.')


def create_zip(request_id):
    path = f'{os.getcwd()}/{request_id}'
    shutil.make_archive(path,
                        'zip',
                        path)
    if os.path.exists(path):
        shutil.rmtree(path)
    print(f'ZIP-file for RQ {request_id} created.')
