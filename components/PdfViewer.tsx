import React from "react";

// Define the type for your component's props
type PDFViewerProps = {
  pdfURL: string;
};

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfURL }) => {
  return (
    <div className="w-full h-164">
      <iframe src={pdfURL} title="PDF Viewer" className="w-full h-full border-none" />
    </div>
  );
};

export default PDFViewer
