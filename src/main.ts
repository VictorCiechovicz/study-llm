import { OpenAI } from "langchain/llms/openai"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { ChatPromptTemplate } from "langchain/prompts"
import { BaseOutputParser, FormatInstructionsOptions } from "langchain/schema/output_parser"
import { Callbacks } from "langchain/callbacks"
console.clear()
console.log("---- initializing project ----")


class CommaSeparatedListOutputparser extends BaseOutputParser<string[]>{
  async parse(text: string, callbacks?: Callbacks | undefined): Promise<string[]> {
    return text.split(", ").map((empresa:string)=>empresa.trim())
  }
  getFormatInstructions(options?: FormatInstructionsOptions | undefined): string {
    throw new Error("Method not implemented.")
  }
  lc_namespace: string[]=[]

}

const configuration={
  openAIApiKey:process.env.OPEN_API_KEY,
  temperature:0

}

//----------------------------------//

/* const llm = new OpenAI(configuration)
const responseLLM = await llm.invoke("Me de nomes de cachorros")
console.log(responseLLM) */

//----------------------------------//


const chatModel= new ChatOpenAI(configuration)
const parser = new CommaSeparatedListOutputparser()

const systemMessage = "Voce é um {profissional} {nivel} muito conhecido e {nivel1} confianca." 

const humanMessage = "Qual seria um bom nome de empresa que trabalha com {tecnologia} ?"

const chatPromptTemplate =   ChatPromptTemplate.fromMessages([
  ["system",systemMessage],
  ["human",humanMessage]
])

const chain =  chatPromptTemplate.pipe(chatModel).pipe(parser)

const response = await chain.invoke({
  profissional: "Programador",
  nivel:"com",
  nivel1:"pouca",
  tecnologia:"Next.js"
})
console.log(response)
