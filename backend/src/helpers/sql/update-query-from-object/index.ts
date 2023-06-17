export default function updateQueryFromObject(object: Record<string, unknown>) {
  return Object.entries(object)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(', ');
}
