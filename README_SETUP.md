# Jinsi ya Kuendesha System (Setup Guide)

Ukipata shida ya Login au Register kwenye VS Code, hakikisha umefuata hatua hizi kwa usahihi:

## 1. Backend (Server) Setup
Fungua terminal mpya kwenye VS Code na ufanye yafuatayo:
```bash
cd server
npm install
# Muhimu: Hii itatengeneza database file
node db/setup.js
# Anza server
npm start
```
**Ukiona kosa la "SQLITE_READONLY":** Hakikisha una ruhusa (permissions) kwenye folder la `server/db`.

## 2. Frontend (Client) Setup
Fungua terminal nyingine (ya pili) kwenye VS Code:
```bash
cd client
npm install
npm run dev
```

## 3. Matatizo ya Kawaida (Troubleshooting)

### A. Login/Register haifanyi kazi
1. Hakikisha **Server inarun** (Check terminal ya server, uone kama kuna log yoyote inatokea ukibonyeza Login).
2. Angalia kama umetengeneza `.env` file kwenye folder la `server` na kuweka `JWT_SECRET`.
   - Unaweza kucopy `.env.example` kwenda `.env`.
3. Hakikisha database imetengenezwa kwa kukimbiza `node db/setup.js` ndani ya folder la `server`.

### B. Map haionekani
1. Unahitaji Google Maps API Key.
2. Iweke kwenye `client/.env` kama:
   `VITE_GOOGLE_MAPS_API_KEY=funguo_yako_hapa`

### C. Connection Refused
Hakikisha server inatumia port **5000**. Kama unatumia port tofauti, badilisha kwenye `client/src/utils/api.js`.

---
**Kumbuka:** Kila unapoanza kufanya kazi, washa zote mbili (Server na Client).
