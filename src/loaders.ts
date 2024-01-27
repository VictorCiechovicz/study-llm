import { TextLoader } from "langchain/document_loaders/fs/text"
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
console.clear()
console.log("---- initializing project ----")


//Text Loader
/* const loader = new TextLoader("src/documents/doc.text");
const doc = await loader.load();

console.log(doc) */

//PDF Loader

const loader = new PDFLoader("src/documents/bitcoin.pdf");
const pdf = await loader.load()
console.log(pdf)