# data/ingestion.py
import requests
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv('DATAGOLF_API_KEY')
BASE_URL = 'https://feeds.datagolf.com'

# Player List
def get_players():
    url = f'{BASE_URL}/get-player-list'
    params = {
        'file_format': 'json',
        'key': API_KEY
    }
    response = requests.get(url, params=params)
    return response.json()

players = get_players()
print(f'Total players: {len(players)}')
print(players)

# Current field / field updates
def get_field():
    url = f'{BASE_URL}/field-updates'
    params = {
        'tour': 'pga',
        'file_format': 'json',
        'key': API_KEY
    }
    response = requests.get(url, params=params)
    return response.json()

field = get_field()
print(field)

# Pre-tournament predictions
def get_predictions():
    url = f'{BASE_URL}/preds/pre-tournament'
    params = {
        'tour': 'pga',
        'file_format': 'json',
        'key': API_KEY
    }
    response = requests.get(url, params=params)
    print(f'Status code: {response.status_code}')
    print(f'Raw response: {response.text[:500]}')
    return response.json()

predictions = get_predictions()
print(predictions['last_updated'])
print(predictions['baseline'][0])  # changed 'field' to 'baseline'

# Skill Ratings
def get_skill_ratings():
    url = f'{BASE_URL}/preds/skill-ratings'
    params = {
        'display': 'value',
        'file_format': 'json',
        'key': API_KEY
    }
    response = requests.get(url, params=params)
    print(f'Status code: {response.status_code}')
    print(f'All keys: {response.json().keys()}')
    print(f'First player: {response.json()["players"][0]}')
    return response.json()

skills = get_skill_ratings()