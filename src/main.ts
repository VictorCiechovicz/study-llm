import { OpenAI } from "langchain/llms/openai"
console.clear()
console.log("----initializing project----")

const text= "Me de o nome de cachorros"


const llm = new OpenAI({
  openAIApiKey:process.env.OPEN_API_KEY,
  temperature:0.9

})

const resp = await llm.invoke(text)

console.log(resp)