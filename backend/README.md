# Backend

## Installation

You need to have [Python 3.7 or newer](https://www.python.org/downloads/), [virtualenv](https://virtualenv.pypa.io/en/latest/) and [sqlite3](https://www.sqlite.org/index.html) installed to run this program.

1. Create a virtualenv and activate it

```bash
virtualenv -p python3.7 env
source env/bin/activate
```

2. Install packages

```bash
pip install -r requirements.txt
```

3. Build database

```bash
sqlite3 pics.db < schema.sql
```

4. Run Telegram listener server

```bash
python server.py
```

5. Run local API

```bash
python api.py
```
