export const getSlugText = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((word) => word)
    .join('-')
