import { getFocos } from "@/lib/api"
import MapPageClient from "@/components/MapPageClient"

export default async function Home() {
  const focos = await getFocos()
  return <MapPageClient focos={focos} />
}
