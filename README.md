# 🤖 AI Data Dictionary

> An intelligent tool that automatically analyzes PostgreSQL databases and generates comprehensive documentation using AI.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge&logo=vercel)](https://ai-dd-frontend.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Shivang1109/AI-DATA-DICTIONARY)

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?style=flat-square&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python)

---

## 🌟 Features

### Core Functionality
- 🔍 **Auto Schema Extraction** - Automatically discover tables, columns, data types, and constraints
- 🤖 **AI-Powered Summaries** - Generate business-friendly explanations for each table
- 📊 **Data Quality Analysis** - Completeness, uniqueness, and quality metrics for every column
- 🔗 **Relationship Mapping** - Visual foreign key relationship graphs and data lineage
- 📈 **Data Visualization** - Interactive charts showing quality metrics and statistics
- 💾 **Export Capabilities** - Export documentation to JSON, CSV, and PDF formats

### User Experience
- 🎨 **Modern UI** - Beautiful, responsive interface with light theme
- 🚀 **Demo Mode** - Try instantly with 6.2M sample records across 10 tables
- ⚡ **Fast Analysis** - Complete database analysis in under 3 seconds
- 🔄 **Real-time Updates** - Live data profiling and quality metrics
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

---

## 🚀 Live Demo

### Try it now: [https://ai-dd-frontend.vercel.app](https://ai-dd-frontend.vercel.app)

**Quick Start:**
1. Click "Start Analyzing"
2. Toggle "Demo Mode" ON
3. Click "Start Analysis"
4. Explore 10 tables with 6.2M records!

---

## 📸 Screenshots

### Home Page
Beautiful landing page with feature showcase and statistics

### Connect Page
Easy database connection with demo mode toggle for instant testing

### Explorer Page
Interactive data exploration with three tabs:
- **Details**: Column information, data types, and quality metrics
- **Analytics**: Visual charts showing completeness and uniqueness
- **Lineage**: Relationship graphs showing foreign key connections

### Settings Page
Customize preferences, notifications, and export settings

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization library
- **React Hot Toast** - Beautiful notifications

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Relational database
- **Psycopg2** - PostgreSQL adapter
- **Python 3.11** - Backend language

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting
- **GitHub** - Version control

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL (optional - demo mode works without it)

### 1. Clone Repository
```bash
git clone https://github.com/Shivang1109/AI-DATA-DICTIONARY.git
cd AI-DATA-DICTIONARY
```

### 2. Setup Backend
```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
uvicorn app.main:app --reload
```
Backend runs at: **http://localhost:8000**

### 3. Setup Frontend
```bash
cd ai-dd-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend runs at: **http://localhost:3000**

---

## 🎯 Usage

### Demo Mode (No Database Required)
1. Open http://localhost:3000
2. Click "Start Analyzing"
3. Toggle "Demo Mode" ON
4. Click "Start Analysis"
5. Explore 10 tables with 6.2M records

### Connect Your Database
1. Go to Connect page
2. Toggle "Demo Mode" OFF
3. Enter PostgreSQL credentials:
   - Host: localhost
   - Port: 5432
   - Database: your_database
   - Username: your_username
   - Password: your_password
4. Click "Start Analysis"
5. View your schema documentation

---

## 📊 What You Get

### Table Overview
- Complete list of all tables
- Quality scores for each table
- Row counts and statistics
- Quick search and filtering

### Column Details
- Data types and constraints
- Nullable status
- Completeness percentage
- Uniqueness ratio
- Primary/Foreign key indicators

### Quality Metrics
- Visual charts showing data quality
- Completeness analysis
- Uniqueness analysis
- Quality score calculation

### Relationships
- Foreign key connections
- Visual relationship graphs
- Data lineage tracking
- Referenced tables and columns

### AI Summaries
- Business-friendly explanations
- Table purpose and usage
- Recommended best practices
- Context-aware descriptions

### Export Options
- JSON format for APIs
- CSV format for spreadsheets
- PDF format for documentation

---

## 📁 Project Structure

```
AI-DATA-DICTIONARY/
├── app/                          # Backend (FastAPI)
│   ├── api/                      # API routes
│   │   └── analyze_routes.py    # Database analysis endpoints
│   ├── connectors/               # Database connectors
│   │   ├── base_connector.py    # Base connector class
│   │   └── postgres_connector.py # PostgreSQL implementation
│   ├── metadata/                 # Schema extraction
│   │   └── extractor.py         # Metadata extraction logic
│   ├── profiler/                 # Data profiling
│   │   └── data_profiler.py     # Quality metrics calculation
│   ├── ai_engine/                # AI summarization
│   │   └── summarizer.py        # AI-powered summaries
│   ├── services/                 # Business logic
│   │   └── pipeline_service.py  # Analysis pipeline
│   └── main.py                   # FastAPI application
│
├── ai-dd-frontend/               # Frontend (Next.js)
│   ├── app/                      # App Router pages
│   │   ├── page.tsx             # Home page
│   │   ├── connect/             # Database connection
│   │   ├── explorer/            # Data exploration
│   │   ├── settings/            # Settings page
│   │   └── layout.tsx           # Root layout
│   ├── components/               # React components
│   │   ├── charts/              # Data visualization
│   │   ├── layout/              # Layout components
│   │   ├── ui/                  # UI components
│   │   └── providers/           # Context providers
│   ├── lib/                      # Utilities
│   │   ├── api.ts               # API client
│   │   ├── export.ts            # Export functions
│   │   └── utils.ts             # Helper functions
│   └── public/                   # Static assets
│
├── demo_data.json                # Demo database (small)
├── demo_data_large.json          # Demo database (large)
├── requirements.txt              # Python dependencies
├── start.sh                      # Backend start script
└── README.md                     # This file
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd ai-dd-frontend
vercel deploy --prod
```

### Backend (Railway)
1. Connect GitHub repository
2. Railway auto-detects Python
3. Deploys automatically

**Live URLs:**
- Frontend: https://ai-dd-frontend.vercel.app
- Backend: https://web-production-8d47.up.railway.app

---

## 🎯 Use Cases

### Data Documentation
- Auto-generate comprehensive database documentation
- Keep documentation always up-to-date
- Share with team members

### Data Quality
- Identify data quality issues
- Track completeness metrics
- Monitor data health

### Onboarding
- Help new team members understand the database
- Provide business context for tables
- Explain relationships and dependencies

### Data Governance
- Track data lineage
- Document relationships
- Maintain data catalog

### Database Migration
- Document existing schemas
- Plan migration strategies
- Validate data quality

---

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
# Optional: Add custom configurations
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

---

## 📈 Performance

- **Analysis Speed**: < 3 seconds for most databases
- **Demo Data**: 6.2M records across 10 tables
- **Supported Tables**: Unlimited
- **Concurrent Users**: Scales with deployment

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Shivang Pathak**

- GitHub: [@Shivang1109](https://github.com/Shivang1109)
- LinkedIn: [Connect with me](https://linkedin.com/in/shivang-pathak)
- Portfolio: [View my work](https://your-portfolio.com)

---

## 🙏 Acknowledgments

- Built with Next.js, FastAPI, and PostgreSQL
- Inspired by modern data catalog tools
- UI design inspired by contemporary dashboard aesthetics
- Demo data generated for realistic testing

---

## 📞 Support

If you have any questions or need help:
- 📧 Email: your.email@example.com
- 💬 Open an issue on GitHub
- 🌟 Star this repo if you find it helpful!

---

## 🎉 Project Highlights

- ✅ **10,000+** lines of code
- ✅ **15+** features implemented
- ✅ **6.2M** demo records
- ✅ **100%** automated analysis
- ✅ **< 3s** analysis time
- ✅ **2** cloud platforms
- ✅ **10+** technologies used

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**[Live Demo](https://ai-dd-frontend.vercel.app)** • **[Report Bug](https://github.com/Shivang1109/AI-DATA-DICTIONARY/issues)** • **[Request Feature](https://github.com/Shivang1109/AI-DATA-DICTIONARY/issues)**

Made with ❤️ by Shivang Pathak

</div>
