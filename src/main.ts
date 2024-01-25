import { OpenAI } from "langchain/llms/openai"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { ChatPromptTemplate } from "langchain/prompts"
console.clear()
console.log("---- initializing project ----")

const text= "Me de nomes de cachorros"

const configuration={
  openAIApiKey:process.env.OPEN_API_KEY,
  temperature:0

}


/* const llm = new OpenAI(configuration)
const responseLLM = await llm.invoke(text)
console.log(responseLLM) */

//----------------------------------//


const chatModel= new ChatOpenAI(configuration)


const systemMessage = "Voce é um {profissional} {nivel} muito conhecido e {nivel1} confianca." 

const humanMessage = "Qual seria um bom nome de empresa que trabalha com {tecnologia} ?"

const chatPromptTemplate =   ChatPromptTemplate.fromMessages([
  ["system",systemMessage],
  ["human",humanMessage]
])

const formatedPrompt = await chatPromptTemplate.formatMessages({
  profissional: "Programador",
  nivel:"com",
  nivel1:"pouca",
  tecnologia:"Next.js"
})

const responseChatModel = await chatModel.invoke(formatedPrompt)
console.log(responseChatModel)