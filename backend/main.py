from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend_methods import get_card, insert_into_card_table  # adjust import paths

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
    card = get_card(card_id)
    if card:
        insert_into_card_table(card)
        return {"status": "success", "message": f"{card_id} inserted"}
    raise HTTPException(status_code=404, detail="Card not found")
