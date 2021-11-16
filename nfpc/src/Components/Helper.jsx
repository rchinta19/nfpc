import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker } from '@react-pdf-viewer/core';

import help from '../Assets/help.pdf'
function Helper() {
 
  return (
    <div>
    
<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
<Viewer fileUrl={help} />    
</Worker>
     
    </div>
  );
}
export default Helper;
