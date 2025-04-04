import { GoogleGenerativeAI } from "@google/generative-ai";

// 👇 Thay API key của bạn ở đây (lưu ý: ai cũng có thể xem khi bundle)
const genAI = new GoogleGenerativeAI("AIzaSyBCuTKlG8Zp70pb0OWtsFNxajOudo6fyFY");

const generationConfig = {
    temperature: 0.6, // Giảm độ ngẫu nhiên
    topP: 0.85,       // Điều chỉnh topP để giảm độ phức tạp
    topK: 50,         // Giảm số lượng kết quả đầu ra
    maxOutputTokens: 1024, // Giảm độ dài tối đa của phản hồi
    responseMimeType: "text/plain",
};

export async function askGemini(prompt) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-pro-exp-03-25",
        });

        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        const text = result.response.text();
        return text;
    } catch (err) {
        console.error("Lỗi khi gọi Gemini:", err);
        return "Đã xảy ra lỗi!";
    }
}
