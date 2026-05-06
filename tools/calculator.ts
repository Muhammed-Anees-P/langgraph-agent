import { tool } from "langchain";
import { z } from "zod";

export const calculator = tool(
  async ({ expression }) => {
    try {
      const result = eval(expression);

      return `Result: ${result}`;
    } catch {
      return "Invalid expression";
    }
  },
  {
    name: "calculator",
    description: "Calculate mathematical expressions",
    schema: z.object({
      expression: z.string(),
    }),
  },
);
