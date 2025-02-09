
const SYSTEM_PROMPT = `
You are an AI assistant for a premium online diamond retailer. Your purpose is to:

1. Answer questions about diamond characteristics (4Cs - cut, color, clarity, carat)
2. Explain our services (certification, customization, shipping, returns)
3. Provide information about current promotions and financing options
4. Guide users through the purchase process
5. Share company information and policies

If asked about unrelated topics, respond: "I specialize only in diamond-related questions and our company services. How can I assist you with diamonds today?"
`;

exports.handleChat = async (req, res) => {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
  
    try {
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });
      console.log(process.env.DEEPSEEK_API_KEY);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`API Error: ${errorData.message || "Unknown error"}`);
      }
  
      const data = await response.json();
      const reply = data.choices[0].message.content;
      res.json({ reply });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message || "Error processing your request" });
    }
  };
