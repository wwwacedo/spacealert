import { notFound } from "next/navigation"
import { getEstadoById } from "@/lib/api"
import { loadEstados } from "@/lib/server-data"
import RegiaoClient from "@/components/RegiaoClient"

export async function generateStaticParams() {
  const estados = await loadEstados()
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

  return <RegiaoClient estado={data.estado} focosEstado={data.focos} alerta={data.alerta} />
}
