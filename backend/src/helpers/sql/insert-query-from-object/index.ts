export default function insertQueryFromObject(object: Record<'string', unknown>) {
  const keys = Object.keys(object);
  const values = Object.values(object);

  const valuePlaceholders = values.map((value) => {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  });

  return `(${keys.join(',')}) VALUES (${valuePlaceholders.join(',')})`;
}
