


export const Playing = (idx: number) => {
  return {
    type: "Playing",
    payload: idx,
  }
}
export const Pausing = (idx: number) => {
  return {
    type: "SET_CURRENT_INDEX",
    payload: idx,
  }
}