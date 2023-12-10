
import { Chat } from '@/components/chat'
import { nanoid } from 'nanoid'

export default function IndexPage() {
  const id = nanoid()

  return <Chat id={id} />
}
