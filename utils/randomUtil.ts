export function randomFromArray<ArrayItemType>(
  items: ArrayItemType[]
): ArrayItemType {
  return items[Math.floor(Math.random() * items.length)];
}
