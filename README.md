# Home Base
Blue Jays homebase dashboard

## Local Development Setup

### Prerequisites
- Python 3.12.10 (we recommend using [pyenv](https://github.com/pyenv/pyenv) for version management)
- Node.js (latest LTS version)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd bluejays-backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   python app.py
   ```
   The backend will run on http://127.0.0.1:8080

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd bluejays-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on http://localhost:5173 (default Vite port)

### Running Both Apps
You'll need to run both the backend and frontend servers simultaneously. Open two terminal windows/tabs:

- Terminal 1: Run the backend as described above
- Terminal 2: Run the frontend as described above

The frontend will proxy API requests to the backend running on port 8080.

### Testing
Once both servers are running, you can access the application at http://localhost:5173