export function replaceTemplateString<T>(
  object: T,
  values: Record<string, any>,
): typeof object {
  let stringifyObj = JSON.stringify(object);

  Object.keys(values).forEach((key) => {
    stringifyObj = stringifyObj.replaceAll(key, values[key]);
  });

  return JSON.parse(stringifyObj);
}
