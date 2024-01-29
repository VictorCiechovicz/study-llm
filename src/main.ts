import { createClient } from '@supabase/supabase-js'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
console.clear()
console.log('---- initializing project ----')

const supabaseKey = process.env.SUPABASE_KEY
if (!supabaseKey) throw new Error('Expected SUPABASE KEY')

const url = process.env.SUPABASE_URL
if (!url) throw new Error('Expected SUPABASE URL')

const configuration = {
  openAIApiKey: process.env.OPEN_API_KEY,
  temperature: 0
}

const loader = new PDFLoader('src/documents/bitcoin.pdf')
const pdf = await loader.load()

const embedding = new OpenAIEmbeddings(configuration)
const client = createClient(url, supabaseKey)

const run = async () => {
  const vectorStore = await SupabaseVectorStore.fromDocuments(pdf, embedding, {
    client,
    tableName: 'documents',
    queryName: 'match_documents'
  })
  const resultOne = await vectorStore.similaritySearch('Satoshi')
  console.log(resultOne)
}
run()
