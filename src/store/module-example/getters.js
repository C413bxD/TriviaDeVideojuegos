export function someGetter (/* state */) {

}

export function getConfigJuego (state){
  const ConfigJuego={
    "dificultad": state.dificultad,
    "categoria": state.categoria
  }
  return ConfigJuego
}
