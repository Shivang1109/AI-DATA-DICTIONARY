from app.connectors.postgres_connector import PostgresConnector

class DataProfiler:
    """Profile data quality and statistics"""
    
    def __init__(self, connector: PostgresConnector):
        self.connector = connector
    
    def profile_table(self, table_name, columns):
        """Profile a table's data quality"""
        profile = {
            "rows_sampled": 0,
            "completeness": {},
            "uniqueness_ratio": {}
        }
        
        try:
            # Get row count
            self.connector.cursor.execute(f"SELECT COUNT(*) FROM {table_name};")
            total_rows = self.connector.cursor.fetchone()[0]
            profile["rows_sampled"] = min(total_rows, 1000)
            
            if total_rows == 0:
                return profile
            
            # Profile each column
            for col in columns:
                col_name = col["name"]
                
                # Completeness (non-null ratio)
                self.connector.cursor.execute(
                    f"SELECT COUNT(*) FROM {table_name} WHERE {col_name} IS NOT NULL;"
                )
                non_null_count = self.connector.cursor.fetchone()[0]
                profile["completeness"][col_name] = non_null_count / total_rows if total_rows > 0 else 0
                
                # Uniqueness ratio
                self.connector.cursor.execute(
                    f"SELECT COUNT(DISTINCT {col_name}) FROM {table_name};"
                )
                distinct_count = self.connector.cursor.fetchone()[0]
                profile["uniqueness_ratio"][col_name] = distinct_count / total_rows if total_rows > 0 else 0
        
        except Exception as e:
            print(f"Error profiling table {table_name}: {e}")
        
        return profile
