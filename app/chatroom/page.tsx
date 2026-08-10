import SiteShell from '@/components/site-shell'
import ChatroomClient from '@/components/chatroom-client'
import { ALL_ROOMS } from '@/lib/rooms'
import { getLiveRoomData } from '@/lib/ek21-live'

export default async function ChatroomPage() {
  const { rooms: liveCounts } = await getLiveRoomData(ALL_ROOMS.map(r => r.name))
  const rooms = ALL_ROOMS.map(r => ({
    name: r.name,
    category: r.category,
    users: liveCounts[r.name] ?? r.fallbackUsers,
  }))

  return (
    <SiteShell>
      <ChatroomClient rooms={rooms} />
    </SiteShell>
  )
}
