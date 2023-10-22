async function openaiRequest(options) {
  try {
    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(options),
    });
    const data = await result.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error(`An error occured with the OpenAI Request: ${error.message}`);
    return null;
  }
}

module.exports = openaiRequest;
