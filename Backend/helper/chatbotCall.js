import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatbotCall = async (productDetails, question) => {
    // console.log("Product details:", productDetails);
    // console.log("User question:", question);
    // return "hi";
    let productDetailsString = JSON.stringify(productDetails);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    // ecommerce chatbot, works with product details and user question
    const prompt = `
        You are an AI assistant for an e-commerce platform.
        Your task is to analyze product details and answer user questions about them.
        The product details are provided below, and the user question is a natural language query.

        details: ${productDetailsString}
        \n\n\n
        question: ${question}
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let responseText = response.text();
        
        // Remove markdown code block formatting if present
        let cleanedResponse = responseText.replace(/```javascript|```json|```|\s*```/g, "").trim();
        console.log("Chatbot response:", cleanedResponse);
        return cleanedResponse;
    } catch (error) {
        console.error("Error generating gemini response:", error);
        throw error;
    }
};

export { chatbotCall};