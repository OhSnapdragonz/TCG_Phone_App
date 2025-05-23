const IP = Constants.expoConfig.extra.IP_ADDRESS;           // e.g. "192.168.1.12"
const BASE_URL = `http://${IP}:8000`;

export async function insertCard(cardId) {
  const res = await fetch(`${BASE_URL}/card/${cardId}`, { method: 'GET' });
  if (!res.ok) throw new Error(`Insert failed: ${res.status}`);
  return res.json();                                        // { status, message }
}

export async function getCardLibraryPricing() {
  const res = await fetch(`${BASE_URL}/cards/pricing`);
  if (!res.ok) throw new Error("Failed to fetch card library pricing");
  return res.json();
}

export async function getPokemonLibraryInfo() {
  const res = await fetch(`${BASE_URL}/cards/pokemon`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon library info");
  return res.json();
}