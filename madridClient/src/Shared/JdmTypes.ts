export type ITeam = {
  'Codigo_temporada': number
  'Codigo_competicion': string
  'Codigo_fase': number
  'Codigo_grupo': number
  'Codigo_equipo': number
  'Posicion': number
  'Puntos': number
  'Partidos_jugados': number
  'Partidos_ganados': number
  'Partidos_empatados': number
  'Partidos_perdidos': number
  'Goles_favor': number
  'Goles_contra': number
  'Nombre_temporada': string
  'Nombre_competicion': string
  'Nombre_fase': string
  'Nombre_grupo': string
  'Nombre_deporte': string
  'Nombre_categoria': string
  'Nombre_equipo': string
  'Nombre-Sexo': string
  'Nombre_distrito': string
}

// https://datos.madrid.es/FWProjects/egob/Catalogo/Deportes/Ficheros/Estructura_DS_Descripcion_Web_Partidos_.pdf
export type IMatch = {
  'Codigo_temporada': number,
  'Codigo_competicion': string,
  'Codigo_fase': number,
  'Codigo_grupo': number,
  'Jornada': number,
  'Partido': number,
  'Codigo_equipo1': number,
  'Codigo_equipo2': number,
  'Resultado1': number,
  'Resultado2': number,
  'Codigo_campo': number,
  'Fecha': string,
  'Hora': string,
  'Date': Date
  'Programado': number, // 1 = programado se le he asignado fecha hora y campo
  'Estado': 'A' | 'C' | 'F' | 'S' | 'N' | 'O' | 'R', // ver abajo
  'Nombre_temporada': string,
  'Nombre_competición': string,
  'Nombre_fase': string,
  'Nombre_grupo': string,
  'Nombre_deporte': string,
  'Nombre_categoría': string,
  'Nombre_jornada': string,
  'Equipo_local': string,
  'Equipo_visitante': string,
  'Campo': string,
  'Sexo_grupo': 'm' | 'f',
  'Distrito': string,
  'Observaciones': string,
  'SISTEMA_COMPETICION': 'string' // Nombre de la jornada 1, 2 ...
  'COORD_X_CAMPO': string,
  'COORD_Y_CAMPO': string,
  'Color_Camiseta_1': string,
  'Color_Camiseta_2': string
}
