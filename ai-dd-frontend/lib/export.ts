import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportToJSON(schema: any, filename: string = 'schema') {
  const dataStr = JSON.stringify(schema, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToCSV(schema: any, filename: string = 'schema') {
  const tables = Object.keys(schema);
  let csv = 'Table Name,Column Name,Data Type,Nullable,Row Count\n';
  
  tables.forEach(tableName => {
    const table = schema[tableName];
    table.columns.forEach((col: any) => {
      csv += `${tableName},${col.name},${col.type},${col.nullable},${table.row_count}\n`;
    });
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToPDF(schema: any, filename: string = 'schema') {
  const doc = new jsPDF();
  const tables = Object.keys(schema);
  
  // Title
  doc.setFontSize(20);
  doc.text('Database Schema Documentation', 14, 20);
  
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
  doc.text(`Total Tables: ${tables.length}`, 14, 34);
  
  let yPos = 45;
  
  tables.forEach((tableName, index) => {
    const table = schema[tableName];
    
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Table name
    doc.setFontSize(14);
    doc.setTextColor(59, 130, 246);
    doc.text(tableName, 14, yPos);
    yPos += 7;
    
    // AI Summary
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    const summary = table.ai_summary || 'No summary available';
    const splitSummary = doc.splitTextToSize(summary, 180);
    doc.text(splitSummary, 14, yPos);
    yPos += splitSummary.length * 4 + 5;
    
    // Columns table
    const columnData = table.columns.map((col: any) => [
      col.name,
      col.type,
      col.nullable ? 'Yes' : 'No'
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [['Column', 'Type', 'Nullable']],
      body: columnData,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 8 },
      margin: { left: 14 },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 10;
    
    // Stats
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text(`Rows: ${table.row_count?.toLocaleString() || 'N/A'}`, 14, yPos);
    doc.text(`Columns: ${table.columns.length}`, 70, yPos);
    doc.text(`Relationships: ${table.relationships?.length || 0}`, 120, yPos);
    
    yPos += 15;
  });
  
  doc.save(`${filename}.pdf`);
}
