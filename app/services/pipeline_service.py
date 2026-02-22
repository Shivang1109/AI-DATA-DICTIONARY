from app.connectors.postgres_connector import PostgresConnector
from app.metadata.extractor import MetadataExtractor
from app.profiler.data_profiler import DataProfiler
from app.ai_engine.summarizer import AISummarizer

def analyze_database_pipeline(host, port, user, password, database):
    """
    Complete pipeline to analyze a database
    """
    # Connect to database
    connector = PostgresConnector(host, port, user, password, database)
    connector.connect()
    
    try:
        # Extract metadata
        extractor = MetadataExtractor(connector)
        schema = extractor.extract_schema()
        
        # Profile data
        profiler = DataProfiler(connector)
        for table_name, table_data in schema.items():
            profile = profiler.profile_table(table_name, table_data["columns"])
            schema[table_name]["profile"] = profile
        
        # Generate AI summaries
        summarizer = AISummarizer()
        for table_name, table_data in schema.items():
            summary = summarizer.generate_table_summary(
                table_name,
                table_data["columns"],
                table_data["relationships"]
            )
            schema[table_name]["ai_summary"] = summary
        
        return schema
    
    finally:
        connector.close()
