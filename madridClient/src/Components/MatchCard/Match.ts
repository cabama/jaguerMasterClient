export type Match = {
  fecha: Date,
  jornada: number,
  campo: {
    campo: string,
    coordenadas: {
      x: number,
      y: number
    }
  }
  local: string,
  visitante: string,
  resultadoLocal: number,
  resultadoVisitante: number
}
