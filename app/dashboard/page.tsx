import { getEstados } from "@/lib/api"
import DashboardClient from "@/components/DashboardClient"

export default async function DashboardPage() {
  const estados = await getEstados()
  return <DashboardClient estados={estados} />
}
