# TCG_Phone_App

Install dependencies:

```
npm install
```

Create venv

```
$ python3 -m venv .venv
$ .venv/bin/activate
OR
$ .venv/Scripts/activate
$ pip install -r requirements.txt
```

Run backend

```
cd backend
```

```
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Start the app:

```
npx expo start
```

Install the Expo Go app on your phone and scan the QR code to run the app
