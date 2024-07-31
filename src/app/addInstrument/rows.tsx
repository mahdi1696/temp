import { HeaderFormItems } from "../tables/definition";

export const insertCompanyCol = [
  {
    name: "symbol",
    type: "string",
  },
  {
    name: "namePersian",
    type: "string",
  },
  {
    name: "symbolLong",
    type: "string",
  },
  {
    name: "symbolCode",
    type: "string",
  },
  {
    name: "symbolFiveCode",
    type: "string",
  },
  {
    name: "companyCode",
    type: "string",
  },
  {
    name: "companyFourCode",
    type: "string",
  },
  {
    name: "industryCode",
    type: "string",
  },
  {
    name: "industryName",
    type: "string",
  },
  {
    name: "subIndustryCode",
    type: "string",
  },
  {
    name: "subIndustryName",
    type: "string",
  },
  {
    name: "market",
    type: "string",
  },
  {
    name: "boardCode",
    type: "string",
  },
  {
    name: "tsetmcId",
    type: "string",
  },
  {
    name: "name",
    type: "string",
  },
  {
    name: "isArchive",
    value: false,
    type: "boolean",
  },
  {
    name: "isActive",
    value: true,
    type: "boolean",
  },
  {
    name: "isFund",
    type: "boolean",
  },
  {
    name: "isShare",
    value: true,
    type: "boolean",
  },
  {
    name: "fundType",
    type: "enum",
    enum: [
      { name: "ETF", value: "ETF" },
      { name: "ETC", value: "ETC" },
      { name: "Index", value: "Index" },
      { name: "FixIncome", value: "FixIncome" },
      { name: "FOF", value: "FOF" },
      { name: "none", value: "none" },
    ],
  },
  {
    name: "url",
    type: "string",
  },
  {
    name: "siteType",
    type: "enum",
    enum: [
      { name: "Tadbir", value: "Tadbir" },
      { name: "Rayan", value: "Rayan" },
      { name: "none", value: "none" },
    ],
  },
  {
    name: "hasReturn",
    type: "boolean",
  },
  {
    name: "tradeType",
    type: "number",
  },
  {
    name: "alias",
    type: "string",
  },
  {
    name: "codalSymbol",
    type: "string",
  },
] satisfies HeaderFormItems[];
