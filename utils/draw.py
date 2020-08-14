from PIL import Image, ImageDraw, ImageFont
import random
import textwrap
from os import path
from imgurpython import ImgurClient
from imgur_python import Imgur

import json
from datetime import datetime
from time import sleep


def round_corner(radius, fill):
    """Draw a round corner"""
    corner = Image.new('RGBA', (radius, radius), (0, 0, 0, 0))
    draw = ImageDraw.Draw(corner)
    draw.pieslice((0, 0, radius * 2, radius * 2), 180, 270, fill=fill)
    return corner


def round_rectangle(size, radius, fill):
    """Draw a rounded rectangle"""
    width, height = size
    rectangle = Image.new('RGBA', size, fill)
    corner = round_corner(radius, fill)
    rectangle.paste(corner, (0, 0))
    # Rotate the corner and paste it
    rectangle.paste(corner.rotate(90), (0, height - radius))
    rectangle.paste(corner.rotate(180), (width - radius, height - radius))
    rectangle.paste(corner.rotate(270), (width - radius, 0))
    return rectangle


def draw_card(card_name, size=(250, 160)):
    colors = [(249, 65, 68), (243, 114, 44), (248, 150, 30), (249, 199, 79), (144, 190, 109), (67, 170, 139), (87, 117, 144), (239, 99, 81), (243, 131, 117), (247, 163, 153), (251, 195, 188), (255, 227, 224),
              (226, 113, 29), (255, 149, 5), (255, 182, 39), (255, 201, 113), (0, 127, 95), (43, 147, 72), (170, 204, 0), (255, 255, 63), (212, 215, 0), (87, 117, 144), (39, 125, 161), (82, 183, 136), (255, 182, 0)]
    image = Image.new('RGBA', size, (255, 255, 255, 0))

    card = round_rectangle(size, 20, random.choice(colors))

    image.paste(card, (0, 0))

    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype("msjhl.ttf", 22)

    wrapper = textwrap.TextWrapper(width=10)
    word_list = wrapper.wrap(text=card_name)

    card_name_new = ''
    for ii in word_list[:-1]:
        card_name_new = card_name_new + ii + '\n'
    card_name_new += word_list[-1]

    w, h = draw.textsize(card_name_new, font=font)
    draw.text(((size[0]-w)*0.5, (size[1]-h)*0.5),
              card_name_new, fill=(60, 60, 60), font=font)

    return image


def upload_image(client, cardname, cardid, image_path):
    config = {
        # 'album': "autopass-cards",
        'name':  cardid,
        'title': cardid,
        'description': f'cardImage with random colors - {datetime.now()}'
    }

    print(f"Uploading image {cardname}... ")
    # image = client.upload_from_path(image_path, config=config, anon=False)
    image = client.image_upload(
        image_path, cardid, f'cardImage with random colors - {datetime.now()}')

    return image


client_config = {
    'client_id': 'a5c95a6a3f96f21',
    'client_secret': '53e0ddb945dd43798999a1541845f1a41a37be79',
    'access_token': "8c4c79ab45e1d2d2f033c1a4488dda93b42aa9f6",
    'refresh_token': "25de927417108bb9deecad7ebaf2f400f16177e1"
}


# client = ImgurClient(client_id, client_secret, access_token, refresh_token)
client = Imgur(client_config)

with open('cards_new.json', encoding="utf-8") as json_file:
    cards = json.load(json_file)

for c in cards:
    # print('id: ' + c['id'])
    # print('Name: ' + c['cardname'])
    # image = draw_card(c['cardname'])
    # image.save(f"cards/{c['id']}.png")
    if(c['cardimage'] == None):
        image_url = upload_image(
            client, c['cardname'], c['id'], f"cards/{c['id']}.png")
        # c['cardimage'] = image_url['link']
        c['cardimage'] = image_url['response']['data']['link']
        sleep(2)
        with open('cards_new.json', 'w') as outfile:
            json.dump(cards, outfile)

# E8Ev9rMJUtcyqmu
