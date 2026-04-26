# Simple CRM System

A lightweight Customer Relationship Management system to manage contacts, leads, and interactions.

## Features

- **Contact Management** — Add, update, and delete customer records
- **Lead Tracking** — Monitor leads through the sales pipeline
- **Interaction Logs** — Record calls, emails, and meetings per contact
- **Search & Filter** — Quickly find customers by name, status, or tag
- **Dashboard** — Overview of active leads, recent activity, and key metrics

## Tech Stack

| Layer    | Technology        |
|----------|-------------------|
| Frontend | HTML / CSS / JS   |
| Backend  | Python (Flask)    |
| Database | SQLite / PostgreSQL|

## Getting Started

### Prerequisites

- Python 3.9+
- pip

### Installation

```bash
git clone https://github.com/<your-username>/Simple_CRM_System.git
cd Simple_CRM_System
pip install -r requirements.txt
```

### Run

```bash
python app.py
```

Open `http://localhost:5000` in your browser.

## Project Structure

```
Simple_CRM_System/
├── app.py              # Entry point
├── models/             # Database models
├── routes/             # API routes
├── templates/          # HTML templates
├── static/             # CSS / JS assets
├── requirements.txt
└── README.md
```

## API Endpoints

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/contacts`       | List all contacts    |
| POST   | `/api/contacts`       | Create a contact     |
| PUT    | `/api/contacts/<id>`  | Update a contact     |
| DELETE | `/api/contacts/<id>`  | Delete a contact     |
| GET    | `/api/leads`          | List all leads       |

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes and open a Pull Request

## License

MIT
