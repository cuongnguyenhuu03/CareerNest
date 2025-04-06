import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDocument } from 'pdfjs-dist';
import './pdfWorker';
import * as marked from 'marked';

// Thay API key của bạn ở đây (lưu ý: ai cũng có thể xem khi bundle)
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GOOGLE_GEMINI_API_KEY}`);
const generationConfig = {
    temperature: 0.6, // Giảm độ ngẫu nhiên
    topP: 0.85,       // Điều chỉnh topP để giảm độ phức tạp
    topK: 50,         // Giảm số lượng kết quả đầu ra
    maxOutputTokens: 2048, // Giảm độ dài tối đa của phản hồi
    responseMimeType: "text/plain",
};

// Khởi tạo mô hình Gemini
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "Remember you are a chatbot AI from CareerNest website (an online IT job search platform in Vietnam). Developed by Vu Hoang Hai author",
});

export async function askGemini(prompt) {
    if (!prompt) return;
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);

        const text = result.response.text();

        return marked.parse(text);
    } catch (err) {
        console.error("Lỗi khi gọi Gemini:", err);
        return "Đã xảy ra lỗi!";
    }
}

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

export async function askGeminiWithPDF(pdfFile, input) {
    try {
        // Trích xuất văn bản từ PDF
        const extractedText = await extractTextFromPDF(pdfFile);

        // Kết hợp văn bản input và văn bản trích xuất từ PDF
        const combinedPrompt = `${input}\n\nDocument Text:\n${extractedText}`;

        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(combinedPrompt);

        const text = result.response.text();

        return marked.parse(text);
    } catch (err) {
        console.error("Lỗi khi gọi Gemini:", err);
        return "Đã xảy ra lỗi!";
    }
}
