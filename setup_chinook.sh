#!/bin/bash

echo "🎵 Setting up Chinook Database for AI Data Dictionary"
echo "====================================================="
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed or not in PATH"
    echo "Please install PostgreSQL first:"
    echo "  - Mac: brew install postgresql"
    echo "  - Ubuntu: sudo apt-get install postgresql"
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready &> /dev/null; then
    echo "❌ PostgreSQL is not running"
    echo "Please start PostgreSQL first:"
    echo "  - Mac: brew services start postgresql"
    echo "  - Ubuntu: sudo service postgresql start"
    exit 1
fi

echo "✅ PostgreSQL is running"
echo ""

# Download Chinook database
echo "📥 Downloading Chinook database..."
if [ -f "Chinook_PostgreSql.sql" ]; then
    echo "   File already exists, skipping download"
else
    wget -q --show-progress https://raw.githubusercontent.com/lerocha/chinook-database/master/ChinookDatabase/DataSources/Chinook_PostgreSql.sql
    if [ $? -ne 0 ]; then
        echo "❌ Failed to download Chinook database"
        echo "Please check your internet connection"
        exit 1
    fi
fi

echo "✅ Download complete"
echo ""

# Create database
echo "🗄️  Creating database..."
createdb chinook 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Database 'chinook' created"
else
    echo "⚠️  Database 'chinook' already exists, will recreate"
    dropdb chinook
    createdb chinook
    echo "✅ Database 'chinook' recreated"
fi

echo ""

# Import data
echo "📊 Importing data (this may take a minute)..."
psql -d chinook -f Chinook_PostgreSql.sql -q 2>&1 | grep -v "NOTICE" | grep -v "^$"

if [ $? -eq 0 ]; then
    echo "✅ Data imported successfully"
else
    echo "❌ Failed to import data"
    exit 1
fi

echo ""

# Verify
echo "🔍 Verifying setup..."
TABLE_COUNT=$(psql -d chinook -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | xargs)
RECORD_COUNT=$(psql -d chinook -t -c "SELECT SUM(n_live_tup) FROM pg_stat_user_tables;" 2>/dev/null | xargs)

echo "   Tables: $TABLE_COUNT"
echo "   Records: ~$RECORD_COUNT"
echo ""

# Show tables
echo "📋 Tables created:"
psql -d chinook -c "\dt" 2>/dev/null | grep "public" | awk '{print "   - " $3}'

echo ""
echo "====================================================="
echo "✅ Chinook Database Setup Complete!"
echo ""
echo "🎯 Connect in AI Data Dictionary:"
echo "   1. Open http://localhost:3000/connect"
echo "   2. Enter these credentials:"
echo "      Host: localhost"
echo "      Port: 5432"
echo "      Database: chinook"
echo "      User: $(whoami)"
echo "      Password: (your PostgreSQL password)"
echo "   3. Turn OFF Demo Mode"
echo "   4. Click 'Start Analysis'"
echo ""
echo "📊 Expected Results:"
echo "   - 11 tables analyzed"
echo "   - ~50,000 records"
echo "   - Music store business context"
echo "   - Clear foreign key relationships"
echo ""
echo "🎵 Enjoy exploring the Chinook database!"
