


export const Playing = (idx: number) => {
  return {
    type: "Playing",
    payload: idx,
  }
}
export const Pausing = (idx: number) => {
  return {
    type: "Pausing",
    payload: idx,
  }
}