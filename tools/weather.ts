import { tool } from "langchain";
import { z } from "zod";

export const getWeather = tool(
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
