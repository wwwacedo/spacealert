import { notFound } from "next/navigation"
import { estados } from "@/data/estados"
import { focos } from "@/data/focos"
import RegiaoClient from "@/components/RegiaoClient"

export function generateStaticParams() {
  return estados.map((e) => ({ id: e.id }))
}

export default async function RegiaoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const estado = estados.find((e) => e.id === id.toUpperCase())

  if (!estado) notFound()

  const focosEstado = focos.filter((f) => f.estado === estado.id)

  return <RegiaoClient estado={estado} focosEstado={focosEstado} />
}
