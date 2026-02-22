import json

class DocumentationGenerator:
    """Generate documentation in various formats"""
    
    def generate_json(self, schema, output_path="schema_output.json"):
        """Generate JSON documentation"""
        with open(output_path, 'w') as f:
            json.dump(schema, f, indent=2)
        return output_path
    
    def generate_markdown(self, schema, output_path="schema_output.md"):
        """Generate Markdown documentation"""
        md_content = "# Database Schema Documentation\n\n"
        
        for table_name, table_data in schema.items():
            md_content += f"## {table_name}\n\n"
            
            if "ai_summary" in table_data:
                md_content += f"{table_data['ai_summary']}\n\n"
            
            md_content += "### Columns\n\n"
            md_content += "| Column | Type | Nullable |\n"
            md_content += "|--------|------|----------|\n"
            
            for col in table_data.get("columns", []):
                nullable = "Yes" if col.get("nullable", False) else "No"
                md_content += f"| {col['name']} | {col['type']} | {nullable} |\n"
            
            md_content += "\n"
            
            if table_data.get("relationships"):
                md_content += "### Relationships\n\n"
                for rel in table_data["relationships"]:
                    md_content += f"- `{rel['source_column']}` → `{rel['target_table']}.{rel['target_column']}`\n"
                md_content += "\n"
        
        with open(output_path, 'w') as f:
            f.write(md_content)
        
        return output_path
