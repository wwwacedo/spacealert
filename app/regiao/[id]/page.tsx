import { notFound } from "next/navigation"
import { getEstadoById } from "@/lib/api"
import { estados } from "@/data/estados"
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
  const data = await getEstadoById(id)

  if (!data) notFound()

  return <RegiaoClient estado={data.estado} focosEstado={data.focos} />
}
