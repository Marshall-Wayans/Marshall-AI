const res = await fetch("http://localhost:11434/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "llama3.2:3b",
    prompt: "Hello Marshall",
    stream: false
  })
});

const data = await res.json();

console.log(data.response);
