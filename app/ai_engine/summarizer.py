import os
from openai import OpenAI

class AISummarizer:
    """Generate AI-powered summaries using OpenAI"""
    
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=api_key) if api_key else None
    
    def generate_table_summary(self, table_name, columns, relationships):
        """Generate AI summary for a table"""
        if not self.client:
            return self._generate_fallback_summary(table_name, columns, relationships)
        
        try:
            column_names = [col["name"] for col in columns]
            column_types = [f"{col['name']} ({col['type']})" for col in columns]
            
            prompt = f"""Analyze this database table and provide a concise business-friendly summary:

Table: {table_name}
Columns: {', '.join(column_types)}
Relationships: {len(relationships)} foreign keys

Provide:
1. What this table stores (1-2 sentences)
2. Key business purpose
3. Usage recommendations

Keep it under 100 words."""

            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a database documentation expert. Provide clear, business-friendly explanations."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=200,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
        
        except Exception as e:
            print(f"AI summary error: {e}")
            return self._generate_fallback_summary(table_name, columns, relationships)
    
    def _generate_fallback_summary(self, table_name, columns, relationships):
        """Generate a basic summary without AI"""
        col_count = len(columns)
        rel_count = len(relationships)
        
        summary = f"The '{table_name}' table contains {col_count} columns"
        
        if rel_count > 0:
            summary += f" and has {rel_count} relationship(s) to other tables"
        
        summary += ". This table stores structured data with defined schema and relationships."
        
        # Add column info
        key_columns = [col["name"] for col in columns[:3]]
        if key_columns:
            summary += f" Key columns include: {', '.join(key_columns)}."
        
        return summary
