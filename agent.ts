import "dotenv/config";

import readline from "readline";

import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { getWeather } from "./tools/weather";
import { calculator } from "./tools/calculator";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

const agent = createAgent({
  model,
  tools: [getWeather, calculator],
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages: any[] = [];

console.log(" AI Agent Started");
console.log("Type 'exit' to quit\n");

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  while (true) {
    const input = await ask("You: ");

    if (input.trim().toLowerCase() === "exit") {
      console.log(" Bye!");
      rl.close();
      process.exit(0);
    }

    try {
      messages.push({
        role: "user",
        content: input,
      });

      const result = await agent.invoke({
        messages,
      });

      const aiMessage = result.messages.at(-1);

      console.log(`AI: ${aiMessage?.content}\n`);

      messages.push({
        role: "assistant",
        content: aiMessage?.content,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

main();
