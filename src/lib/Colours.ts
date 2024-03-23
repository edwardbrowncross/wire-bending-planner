export const colours = [
  "#69cfdb",
  "#d7a55b",
  "#81a0f0",
  "#c8c567",
  "#da99df",
  "#76d094",
  "#ec8ba3",
  "#53e0c5",
  "#e29d81",
  "#6bbae1",
  "#a8cb7d",
  "#aab2e3",
  "#e9cd99",
  "#dbabcc",
  "#8dccb5",
  "#b4bc8d"
]

export const getColour = (index: number) => colours[index % colours.length]