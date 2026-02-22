from abc import ABC, abstractmethod

class BaseConnector(ABC):
    """Base class for database connectors"""
    
    @abstractmethod
    def connect(self):
        """Establish database connection"""
        pass
    
    @abstractmethod
    def get_tables(self):
        """Get list of tables"""
        pass
    
    @abstractmethod
    def get_columns(self, table_name):
        """Get columns for a table"""
        pass
    
    @abstractmethod
    def get_relationships(self, table_name):
        """Get foreign key relationships"""
        pass
    
    @abstractmethod
    def close(self):
        """Close database connection"""
        pass
