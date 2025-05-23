const IP = Constants.expoConfig.extra.IP_ADDRESS;           // e.g. "192.168.1.12"
const BASE_URL = `http://${IP}:8000`;

export async function insertCard(cardId) {
  const res = await fetch(`${BASE_URL}/card/${cardId}`, { method: 'GET' });
  if (!res.ok) throw new Error(`Insert failed: ${res.status}`);
  return res.json();                                        // { status, message }
}

export async function insertAllTables(cardId) {
  const res = await fetch(`${BASE_URL}/card/full/${cardId}`, { method: 'POST' });
  if (!res.ok) throw new Error(`Insert full failed: ${res.status}`);
  return res.json();
}

export async function getAllCards() {
  const res = await fetch(`${BASE_URL}/cards`);
  if (!res.ok) throw new Error(`Fetch cards failed: ${res.status}`);
  return res.json();                                        // { cards: [...] }
}