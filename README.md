# 🚀 AI Data Dictionary - Enterprise Schema Intelligence Platform

> Transform your PostgreSQL databases into living, intelligent documentation with AI-powered insights, data quality analytics, and interactive visualizations.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Next.js](https://img.shields.io/badge/next.js-15-black.svg)

## ✨ Key Features

### 🤖 AI-Powered Analysis
- **Intelligent Summaries**: GPT-powered business-friendly explanations for every table
- **Smart Recommendations**: AI suggests optimal usage patterns and best practices
- **Automated Documentation**: Generate comprehensive docs without manual effort

### 📊 Advanced Analytics & Visualization
- **Interactive Charts**: Bar charts for completeness and uniqueness metrics using Recharts
- **Data Quality Metrics**: Completeness, uniqueness, and statistical analysis
- **Quality Scoring**: Automatic quality assessment with color-coded indicators (High/Medium/Low)
- **Visual Relationship Graphs**: Interactive data lineage and foreign key mapping
- **Comparison Views**: Side-by-side table comparison with detailed metrics

### 🔍 Powerful Search & Discovery
- **Advanced Search**: Real-time search across tables with instant results
- **Smart Filters**: Filter by data quality levels (High ≥90%, Medium 70-89%, Low <70%)
- **Quality Indicators**: Color-coded dots and badges show table health at a glance
- **Tabbed Interface**: Organized views for Details, Analytics, and Lineage

### 🎨 Modern UI/UX
- **Dark/Light Themes**: Toggle between themes with persistent preference
- **Toast Notifications**: Real-time feedback for all actions (success, error, loading)
- **Loading Skeletons**: Professional loading states that match content layout
- **Smooth Animations**: 60fps transitions and hover effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Glass-morphism**: Modern frosted glass effects throughout

### 📤 Export & Share
- **Multiple Formats**: Export as JSON, CSV, or PDF with one click
- **Professional PDFs**: Auto-generated documentation with tables, summaries, and statistics
- **Toast Feedback**: Instant confirmation of successful exports
- **Formatted Output**: Clean, readable exports for all formats

### ⚡ Developer Experience
- **Massive Demo Dataset**: 10 tables with 6.2M+ records for realistic testing
- **Loading States**: Skeleton screens for smooth UX
- **Error Handling**: Comprehensive error messages and recovery
- **Type Safety**: Full TypeScript support
- **Component Library**: Reusable UI components

## 🛠️ Tech Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **PostgreSQL**: Database connectivity via psycopg2
- **OpenAI GPT**: AI-powered summaries and insights
- **Pydantic**: Data validation and settings management

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS v3**: Modern utility-first styling
- **Recharts**: Interactive data visualizations (bar charts, quality metrics)
- **React Hot Toast**: Beautiful toast notifications
- **jsPDF + jspdf-autotable**: Professional PDF generation
- **Lucide React**: Beautiful icon library (500+ icons)

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL database (optional - demo mode available)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai_data_dictionary
```

2. **Backend Setup**
```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key
```

3. **Frontend Setup**
```bash
cd ai-dd-frontend
npm install
```

4. **Start the Application**
```bash
# Terminal 1 - Backend (from root directory)
source .venv/bin/activate
uvicorn app.main:app --reload

# Terminal 2 - Frontend (from ai-dd-frontend directory)
npm run dev
```

5. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📖 Usage Guide

### Connecting a Database

1. Navigate to the **Connect** page
2. Enter your PostgreSQL credentials:
   - Host (e.g., localhost)
   - Port (default: 5432)
   - Database name
   - Username
   - Password
3. Or toggle **Demo Mode** to use sample data
4. Click **Start Analysis**

### Exploring Results

#### Dashboard View
- View overall statistics (tables, columns, relationships)
- See quality alerts for low-quality tables
- Identify tables with most columns/relationships

#### Table Details
- **Details Tab**: View columns, types, and relationships
- **Analytics Tab**: Interactive charts and quality metrics
- **Lineage Tab**: Visual relationship mapping

#### Advanced Features
- **Search**: Use ⌘K to open advanced search
- **Compare**: Select up to 3 tables for side-by-side comparison
- **Export**: Download as JSON, CSV, or PDF
- **Share**: Generate shareable links or email reports

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| ⌘/Ctrl + K | Focus search |
| ⌘/Ctrl + E | Toggle export menu |
| ⌘/Ctrl + N | New analysis |
| ⌘/Ctrl + H | Go to home |
| ⌘/Ctrl + D | Go to explorer |
| ? | Show shortcuts help |

## 🎯 Use Cases

### For Data Engineers
- Quickly understand unfamiliar databases
- Document schema changes automatically
- Track data quality metrics over time
- Generate reports for stakeholders

### For Data Analysts
- Discover available data sources
- Understand table relationships
- Assess data quality before analysis
- Find relevant columns quickly

### For Database Administrators
- Monitor schema health
- Identify quality issues
- Document database structure
- Share knowledge with team

### For Product Teams
- Understand data models
- Plan feature development
- Assess data availability
- Communicate with technical teams

## 📊 Demo Data & Real Datasets

### Built-in Demo Data

The application includes comprehensive demo data for quick testing:
- **10 tables** representing a complete e-commerce system
- **6.2+ million simulated records** across all tables
- Realistic relationships and foreign keys
- Complete data quality metrics
- AI-generated summaries for every table

### Real-World Datasets (Recommended for Production)

For testing with real data, we support these industry-standard datasets:

1. **🎵 Chinook Database** (Easiest to setup)
   - 11 tables (music store: artists, albums, tracks, invoices)
   - 50,000+ records
   - Quick setup: `./setup_chinook.sh`
   - MIT licensed - fully free
   - **Perfect for learning and demos**

2. **🛒 Brazilian E-Commerce (Olist)**
   - 9 tables (orders, customers, products, reviews)
   - 100,000+ orders with real-world complexity
   - Great for production testing
   - CC BY-NC-SA 4.0 (free for non-commercial)

3. **🚲 Bike Store Database**
   - 9 tables (sales, inventory, customers)
   - Clean, well-structured retail data
   - CC0 (public domain)

**See [REAL_DATASETS.md](REAL_DATASETS.md) for detailed setup instructions.**

### Demo Data Tables Include:
1. **users** (250,000 records) - Customer accounts with full profiles
2. **products** (45,000 records) - Product catalog with detailed attributes
3. **categories** (250 records) - Hierarchical product taxonomy
4. **orders** (850,000 records) - Order history with complete lifecycle
5. **order_items** (2.1M records) - Detailed line items for all orders
6. **reviews** (125,000 records) - Customer product reviews and ratings
7. **payments** (850,000 records) - Payment transactions and processing
8. **shipping_addresses** (380,000 records) - Customer delivery locations
9. **inventory_transactions** (1.5M records) - Stock movement audit log
10. **wishlists** (95,000 records) - Customer saved items and preferences

Each table includes:
- Complete column definitions
- Data quality metrics (completeness, uniqueness)
- Foreign key relationships
- AI-generated business summaries
- Realistic data distributions

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Customization

- **Theme Colors**: Edit `ai-dd-frontend/app/globals.css`
- **API Endpoints**: Modify `ai-dd-frontend/lib/api.ts`
- **Demo Data**: Update `demo_data.json`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for GPT API
- FastAPI team for the amazing framework
- Next.js team for the React framework
- All open-source contributors

## 📧 Contact

For questions, suggestions, or support, please open an issue on GitHub.

---

**Made with ❤️ for the data community**

⭐ Star this repo if you find it helpful!
