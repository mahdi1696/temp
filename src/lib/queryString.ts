interface QueryStringType {
  t?: "number" | "string" | "boolean" | "enum" | "arr";
  c?: string;
  v?: string;
}

export function parseQueryString(
  input?: string | null
): QueryStringType | null {
  if (!input) return null;
  const parts = input.split(";");
  const parsed: any = {};

  parts.forEach((part) => {
    const [key, value] = part.split(":");
    if (key === "t") {
      parsed.t = value;
    } else if (key === "c") {
      parsed.c = value;
    } else if (key === "v") {
      parsed.v = value;
    }
  });

  return parsed;
}

export const createPrismaQueryObject = (
  query: { [key: string]: string | undefined },
  tableFiledEnum: {}
) => {
  const queryObject = {};
  const companyKeys = Object.keys(tableFiledEnum);
  const queryKeys = Object.keys(query);
  queryKeys.forEach((key) => {
    if (companyKeys.includes(key)) {
      const parseQuery = parseQueryString(query[key]);
      switch (parseQuery?.t) {
        case "string":
          Object.assign(queryObject, { [key]: { contains: parseQuery?.v } });
          break;
        case "number":
          Object.assign(queryObject, { [key]: Number(parseQuery?.v) });
          break;
        case "boolean":
          Object.assign(queryObject, { [key]: parseQuery?.v === "true" });
          break;
        case "enum":
          Object.assign(queryObject, { [key]: parseQuery?.v });
          break;
        case "arr":
          Object.assign(queryObject, { [key]: { has: parseQuery?.v } });
          break;
      }
    }
  });

  return queryObject;
};
