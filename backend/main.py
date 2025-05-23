from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# adjust import paths
from backend_methods.db_methods import get_card, insert_into_card_table, populate_tables, retrieve_card_pricing_table, retrieve_pokemon_information_table

app = FastAPI()

# Allow CORS from Expo client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use ["http://localhost:19006"] in dev if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/card/{card_id}")
def fetch_and_insert_card(card_id: str):
    if card_id:
        populate_tables(card_id)
        print(retrieve_card_pricing_table())
        return {"status": "success", "message": f"{card_id} inserted"}
    raise HTTPException(status_code=404, detail="Card not found")


@app.get("/cards/pricing")
def retrieve_cards_pricing():
    retrieve_card_pricing_table()


@app.get("/cards/pokemon")
def retrieve_cards_information():
    retrieve_pokemon_information_table()
