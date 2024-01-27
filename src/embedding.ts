import { SupabaseVectorStore } from "langchain/vectorstores/supabase" 
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { createClient } from "@supabase/supabase-js"

console.clear()
console.log("---- initializing project ----")

const supabaseKey= process.env.SUPABASE_KEY
if(!supabaseKey) throw new Error("Expected SUPABASE KEY")

const url = process.env.SUPABASE_URL
if(!url) throw new Error("Expected SUPABASE URL")

const configuration={
  openAIApiKey:process.env.OPEN_API_KEY,
  temperature:0

}


export const run = async()=>{
const client = createClient(url,supabaseKey)

//Implement in Supabase
/* const vectorStore = await SupabaseVectorStore.fromTexts([
  "Mundo Azul",
  "Crianca perdida",
  "Developer"
],
[
  {id:1},
  {id:2},

],

new OpenAIEmbeddings(configuration),
{
  client,
  tableName:"documents",
  queryName:"match_documents",
}); */


//Search data in Supabase

const vectorStore = await SupabaseVectorStore.fromExistingIndex(
  new OpenAIEmbeddings(configuration),
  {
    client,
    tableName:"documents",
    queryName:"match_documents",
  }
)

const resultOne =  await vectorStore.similaritySearch("Mundo")
console.log(resultOne)
}
run();

