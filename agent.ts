import "dotenv/config";

import { createAgent, tool } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";

const getWeather = tool(
  async ({ city }) => {
    return `It's always sunny in ${city}`;
  },
  {
    name: "get_weather",
    description: "Get weather for a city",
    schema: z.object({
      city: z.string(),
    }),
  },
);

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const agent = createAgent({
  model,
  tools: [getWeather],
});

async function main() {
  const result = await agent.invoke({
    messages: [
      {
        role: "user",
        content: "What's weather in Dubai?",
      },
    ],
  });

  console.log(result.messages.at(-1)?.content);
}

main();
