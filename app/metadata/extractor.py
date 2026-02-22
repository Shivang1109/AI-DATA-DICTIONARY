from app.connectors.postgres_connector import PostgresConnector

class MetadataExtractor:
    """Extract metadata from database"""
    
    def __init__(self, connector: PostgresConnector):
        self.connector = connector
    
    def extract_schema(self):
        """Extract complete schema metadata"""
        schema = {}
        tables = self.connector.get_tables()
        
        for table in tables:
            columns = self.connector.get_columns(table)
            relationships = self.connector.get_relationships(table)
            
            schema[table] = {
                "columns": columns,
                "relationships": relationships,
                "row_count": self._get_row_count(table)
            }
        
        return schema
    
    def _get_row_count(self, table_name):
        """Get approximate row count for a table"""
        try:
            query = f"SELECT COUNT(*) FROM {table_name};"
            self.connector.cursor.execute(query)
            return self.connector.cursor.fetchone()[0]
        except:
            return 0
