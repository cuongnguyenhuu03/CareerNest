import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDocument } from 'pdfjs-dist';
import './pdfWorker';
import * as marked from 'marked';
import { filterJobs } from "../../services/jobService";
import { toast } from "react-toastify";
import { formatJobsToHTML } from "./formatJobToMarkdown";

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
    systemInstruction: `Bạn là trợ lý AI giúp người dùng tìm việc trên nền tảng CareerNest. Khi người dùng hỏi thông tin 
    như: tìm thông tin công việc/việc làm/job tại đâu, hay công việc về lĩnh vực/công nghệ gì, theo cấp bậc/level nào, thì hãy trả về cho tôi những từ khóa
     đó theo định dạng: keywork:x,location:y,level:[],findJob:true(location hãy chuyển về viết thường và không dấu nhé, 
    còn level mặc định là mảng rỗng, nếu có giá trị thì viết hoa toàn bộ chữ cái và bỏ vào cặp dấu '' nhé)`,
});

function parseTextToObject(text) {
    const result = {};

    // Tách các cặp key:value nhưng không bị split bên trong dấu []
    const pairs = text.match(/[^,]+:\s*(?:\[[^\]]*\]|[^,]*)/g);

    pairs.forEach(pair => {
        const [key, rawValue] = pair.split(':').map(s => s.trim());

        if (!rawValue) {
            result[key] = '';
        } else if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
            // Parse mảng
            try {
                result[key] = JSON.parse(rawValue.replace(/'/g, '"'));
            } catch (e) {
                result[key] = rawValue;
            }
        } else if (rawValue === 'true' || rawValue === 'false') {
            // Parse boolean
            result[key] = rawValue === 'true';
        } else {
            result[key] = rawValue;
        }
    });

    return result;
}


export async function askGemini(prompt) {
    if (!prompt) return;

    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);

        let text = result.response.text();
        if (text.includes("findJob:true")) {
            let obj = parseTextToObject(text);
            try {
                let res = await filterJobs({ page: 1, pageSize: 5, name: obj?.keyword, location: [obj?.location], level: obj?.level });
                text = res?.result?.length > 0 ? formatJobsToHTML(res.result) : 'Xin lỗi, không tìm thấy công việc bạn đang tìm.';
            } catch (error) {
                console.log(error);
                toast.error(error?.message ?? 'Có lỗi xảy ra!');
            }
        }

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
