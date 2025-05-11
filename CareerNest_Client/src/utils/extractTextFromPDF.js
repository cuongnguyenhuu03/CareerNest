import { getDocument } from 'pdfjs-dist';
import '../modules/chatbot/pdfWorker';

export async function extractTextFromPDF(file) {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onload = async () => {
            const typedArray = new Uint8Array(fileReader.result);
            const pdf = await getDocument({ data: typedArray }).promise;
            let textContent = '';

            for (let i = 0; i < pdf.numPages; i++) {
                const page = await pdf.getPage(i + 1);
                const content = await page.getTextContent();
                content.items.forEach((item) => {
                    textContent += item.str + ' ';
                });
            }

            resolve(textContent);
        };

        fileReader.onerror = reject;
        fileReader.readAsArrayBuffer(file);
    });
}
