import { kv } from '@vercel/kv'
import { HfInference } from '@huggingface/inference'

import { experimental_buildOpenAssistantPrompt } from 'ai/prompts'

import { OpenAIStream, StreamingTextResponse, HuggingFaceStream } from 'ai'
// import OpenAI from 'openai'

import { auth } from '@/auth'
import { nanoid } from 'nanoid'

export const runtime = 'edge'

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// })

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  // if (previewToken) {
  //   openai.apiKey = previewToken
  // }
  // if (openai) {
  //   const res = await openai.chat.completions.create({
  //     model: 'gpt-3.5-turbo',
  //     messages,
  //     temperature: 0.7,
  //     stream: true
  //   })
  //   const stream = OpenAIStream(res, {
  //     async onCompletion(completion) {
  //       const title = json.messages[0].content.substring(0, 100)
  //       const id = json.id ?? nanoid()
  //       const createdAt = Date.now()
  //       const path = `/chat/${id}`
  //       const payload = {
  //         id,
  //         title,
  //         userId,
  //         createdAt,
  //         path,
  //         messages: [
  //           ...messages,
  //           {
  //             content: completion,
  //             role: 'assistant'
  //           }
  //         ]
  //       }
  //       await kv.hmset(`chat:${id}`, payload)
  //       await kv.zadd(`user:chat:${userId}`, {
  //         score: createdAt,
  //         member: `chat:${id}`
  //       })
  //     }
  //   })
  //   return new StreamingTextResponse(stream)
  // } else {
    const res = Hf.textGenerationStream({
      model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
      inputs: experimental_buildOpenAssistantPrompt(messages),
      parameters: {
        max_new_tokens: 500,
        // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
        typical_p: 0.2,
        repetition_penalty: 1,
        truncate: 1000,
        return_full_text: false
      }
      
    })
    const stream = HuggingFaceStream(res, {
      async onCompletion(completion) {
        const title = json.messages[0].content.substring(0, 100)
        const id = json.id ?? nanoid()
        const createdAt = Date.now()
        const path = `/chat/${id}`
        const payload = {
          id,
          title,
          userId,
          createdAt,
          path,
          messages: [
            ...messages,
            {
              content: completion,
              role: 'assistant'
            }
          ]
        }
        await kv.hmset(`chat:${id}`, payload)
        await kv.zadd(`user:chat:${userId}`, {
          score: createdAt,
          member: `chat:${id}`
        })
      }
    })
    return new StreamingTextResponse(stream)
  }
// }
