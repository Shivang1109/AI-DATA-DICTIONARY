# 🤖 AI Data Dictionary

An intelligent tool that automatically analyzes PostgreSQL databases and generates comprehensive documentation using AI.

![AI Data Dictionary](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?style=flat-square&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)

## ✨ Features

- 🔍 **Auto Schema Extraction** - Automatically discover tables, columns, and relationships
- 🤖 **AI-Powered Summaries** - Generate business-friendly explanations for tables
- 📊 **Data Quality Analysis** - Completeness, uniqueness, and quality metrics
- 🔗 **Relationship Mapping** - Visual foreign key relationship graphs
- 📈 **Data Visualization** - Interactive charts and quality metrics
- 💾 **Export Capabilities** - Export to JSON, CSV, and PDF
- 🎨 **Modern UI** - Beautiful, responsive interface with light theme
- 🚀 **Demo Mode** - Try it instantly with 6.2M sample records

## � Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL (optional - demo mode works without it)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Shivang1109/AI-DATA-DICTIONARY.git
cd AI-DATA-DICTIONARY
```

2. **Setup Backend**
```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start backend
uvicorn app.main:app --reload
```

Backend runs at: http://localhost:8000

3. **Setup Frontend**
```bash
cd ai-dd-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: http://localhost:3000

## 🎯 Usage

### Demo Mode (No Database Required)

1. Open http://localhost:3000
2. Click "Start Analyzing"
3. Toggle "Demo Mode" ON
4. Click "Start Analysis"
5. Explore 10 tables with 6.2M records!

### Connect Your Database

1. Go to Connect page
2. Toggle "Demo Mode" OFF
3. Enter your PostgreSQL credentials:
   - Host: localhost
   - Port: 5432
   - Database: your_database
   - Username: your_username
   - Password: your_password
4. Click "Start Analysis"

## 📊 What You Get

- **Table Overview** - Complete list of all tables with quality scores
- **Column Details** - Data types, nullable status, completeness metrics
- **Quality Metrics** - Visual charts showing data quality
- **Relationships** - Foreign key connections and data lineage
- **AI Summaries** - Business context for each table
- **Export Options** - Download documentation in multiple formats

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Hot Toast** - Notifications

### Backend
- **FastAPI** - Python web framework
- **PostgreSQL** - Database
- **Psycopg2** - PostgreSQL adapter
- **Python 3.8+** - Backend language

## 📁 Project Structure

```
AI-DATA-DICTIONARY/
├── app/                      # Backend (FastAPI)
│   ├── api/                  # API routes
│   ├── connectors/           # Database connectors
│   ├── metadata/             # Schema extraction
│   ├── profiler/             # Data profiling
│   ├── ai_engine/            # AI summarization
│   └── main.py               # FastAPI app
├── ai-dd-frontend/           # Frontend (Next.js)
│   ├── app/                  # Pages
│   ├── components/           # React components
│   ├── lib/                  # Utilities
│   └── public/               # Static assets
├── demo_data.json            # Demo database (small)
├── demo_data_large.json      # Demo database (large)
└── requirements.txt          # Python dependencies
```

## 🚀 Deployment

### Deploy Frontend (Vercel)

```bash
cd ai-dd-frontend
vercel deploy --prod
```

Demo mode works without backend deployment!

### Deploy Backend (Railway/Render)

1. Connect your GitHub repo
2. Deploy the `app/` folder
3. Add PostgreSQL database
4. Update frontend API URL

See [DEPLOY.md](DEPLOY.md) for detailed instructions.

## 📸 Screenshots

### Home Page
Beautiful landing page with feature showcase

### Connect Page
Easy database connection with demo mode toggle

### Explorer Page
Interactive data exploration with tabs for details, analytics, and lineage

### Analytics
Visual charts showing data quality metrics

## 🎯 Use Cases

- **Data Documentation** - Auto-generate database documentation
- **Data Quality** - Identify data quality issues
- **Onboarding** - Help new team members understand the database
- **Data Governance** - Track data lineage and relationships
- **Database Migration** - Document existing schemas before migration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## �‍💻 Author

**Shivang Pathak**
- GitHub: [@Shivang1109](https://github.com/Shivang1109)

## 🙏 Acknowledgments

- Built with Next.js, FastAPI, and PostgreSQL
- Inspired by modern data catalog tools
- UI design inspired by contemporary dashboard aesthetics

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

⭐ Star this repo if you find it helpful!
