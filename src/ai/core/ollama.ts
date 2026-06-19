type OllamaRequest = {
  prompt: string
}


export async function generateAIResponse(
  {
    prompt
  }: OllamaRequest
): Promise<string> {


  const response = await fetch(
    "http://localhost:11434/api/generate",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        model: "llama3.2:3b",

        prompt: String(prompt),

        stream: false

      }),
    }
  )


  if (!response.ok) {

    throw new Error(
      `Ollama error: ${response.status}`
    )

  }


  const data = await response.json()


  return data.response

}