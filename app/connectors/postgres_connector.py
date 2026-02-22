import psycopg2
from app.connectors.base_connector import BaseConnector

class PostgresConnector(BaseConnector):
    """PostgreSQL database connector"""
    
    def __init__(self, host, port, user, password, database):
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.database = database
        self.conn = None
        self.cursor = None
    
    def connect(self):
        """Establish PostgreSQL connection"""
        self.conn = psycopg2.connect(
            host=self.host,
            port=self.port,
            user=self.user,
            password=self.password,
            database=self.database
        )
        self.cursor = self.conn.cursor()
        return self.conn
    
    def get_tables(self):
        """Get list of tables in the database"""
        query = """
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
            ORDER BY table_name;
        """
        self.cursor.execute(query)
        return [row[0] for row in self.cursor.fetchall()]
    
    def get_columns(self, table_name):
        """Get columns for a specific table"""
        query = """
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = %s
            ORDER BY ordinal_position;
        """
        self.cursor.execute(query, (table_name,))
        columns = []
        for row in self.cursor.fetchall():
            columns.append({
                "name": row[0],
                "type": row[1],
                "nullable": row[2] == 'YES'
            })
        return columns
    
    def get_relationships(self, table_name):
        """Get foreign key relationships for a table"""
        query = """
            SELECT
                kcu.column_name as source_column,
                ccu.table_name AS target_table,
                ccu.column_name AS target_column
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
                ON tc.constraint_name = kcu.constraint_name
                AND tc.table_schema = kcu.table_schema
            JOIN information_schema.constraint_column_usage AS ccu
                ON ccu.constraint_name = tc.constraint_name
                AND ccu.table_schema = tc.table_schema
            WHERE tc.constraint_type = 'FOREIGN KEY'
                AND tc.table_name = %s;
        """
        self.cursor.execute(query, (table_name,))
        relationships = []
        for row in self.cursor.fetchall():
            relationships.append({
                "source_column": row[0],
                "target_table": row[1],
                "target_column": row[2]
            })
        return relationships
    
    def get_sample_data(self, table_name, limit=100):
        """Get sample data from table"""
        query = f"SELECT * FROM {table_name} LIMIT %s;"
        self.cursor.execute(query, (limit,))
        return self.cursor.fetchall()
    
    def close(self):
        """Close database connection"""
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()
