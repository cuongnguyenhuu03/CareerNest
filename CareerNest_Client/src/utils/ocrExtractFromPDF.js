import { getDocument } from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import '../modules/chatbot/pdfWorker';

export async function ocrExtractFromPDF(pdfFile) {
    const typedArray = new Uint8Array(await pdfFile.arrayBuffer());
    const pdf = await getDocument({ data: typedArray }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        const imageDataUrl = canvas.toDataURL(); // base64 image

        const { data: { text } } = await Tesseract.recognize(imageDataUrl, 'eng', {
            logger: m => console.log(`OCR page ${i}:`, m.status, m.progress),
        });

        fullText += text + '\n';
    }

    return fullText.trim();
}
