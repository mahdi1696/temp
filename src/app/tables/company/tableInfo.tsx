import { HeaderFormItems } from "../definition";

export const companyHeaderFormItems = [
  { type: "number", name: "id" },
  { type: "string", name: "symbol" },
  { type: "string", name: "namePersian" },
  { type: "string", name: "nameDisplay" },
  { type: "string", name: "symbolLong" },
  { type: "string", name: "symbolCode" },
  { type: "string", name: "symbolFiveCode" },
  { type: "string", name: "companyCode" },
  { type: "string", name: "companyFourCode" },
  { type: "string", name: "industryCode" },
  { type: "string", name: "industryName" },
  { type: "string", name: "subIndustryCode" },
  { type: "string", name: "subIndustryName" },
  { type: "string", name: "market" },

  { type: "string", name: "boardCode" },
  { type: "string", name: "tsetmcId" },
  { type: "string", name: "name" },
  { type: "boolean", name: "isArchive" },
  { type: "boolean", name: "isActive" },
  { type: "boolean", name: "isFund" },
  { type: "boolean", name: "isShare" },
  { type: "number", name: "fundType" },
  { type: "string", name: "url" },
  { type: "boolean", name: "hasReturn" },
  { type: "number", name: "tradeType" },
  { type: "string", name: "alias" },

  {
    type: "enum",
    name: "siteType",
    enum: [
      { name: "Rayan", value: "Rayan" },
      { name: "Tadbir", value: "Tadbir" },
    ],
  },
] satisfies HeaderFormItems[];

export const companyColumns: DataTableColumn<Company>[] = [
  {
    id: 0,
    title: "id",
    content: (row) => row.id,
  },
  {
    id: 1,
    title: "نماد",
    content: (row) => row.symbol,
    headerClass: "sticky right-0 bg-background z-30",
    columnsClass: "sticky right-0 bg-background z-10",
  },
  {
    id: 3,
    title: "نام فارسی",
    content: (row) => row.namePersian,
  },
  {
    id: 4,
    title: "نام نمایش",
    content: (row) => row.nameDisplay,
  },
  {
    id: 5,
    title: "نماد طولانی",
    content: (row) => row.symbolLong,
  },
  {
    id: 6,
    title: "کد نماد",
    content: (row) => row.symbolCode,
  },
  {
    id: 7,
    title: "کد ۵ رقمی نماد",
    content: (row) => row.symbolFiveCode,
  },
  {
    id: 8,
    title: "کد شرکت",
    content: (row) => row.companyCode,
  },
  {
    id: 9,
    title: "کد ۴ رقمی شرکت",
    content: (row) => row.companyFourCode,
  },
  {
    id: 10,
    title: "کد صنعت",
    content: (row) => row.industryCode,
  },
  {
    id: 11,
    title: "صنعت",
    content: (row) => row.industryName,
  },
  {
    id: 12,
    title: "کد زیر صنعت",
    content: (row) => row.subIndustryCode,
  },
  {
    id: 13,
    title: "زیر صنعت",
    content: (row) => row.subIndustryName,
  },
  {
    id: 14,
    title: "بازار",
    content: (row) => row.market,
  },
  {
    id: 15,
    title: "کد تابلو",
    content: (row) => row.boardCode,
  },
  {
    id: 16,
    title: "tsetmcId",
    content: (row) => row.tsetmcId,
  },
  {
    id: 17,
    title: "نام",
    content: (row) => row.name,
  },
  {
    id: 18,
    title: "isArchive",
    content: (row) => String(row.isArchive),
  },
  {
    id: 19,
    title: "isActive",
    content: (row) => String(row.isActive),
  },
  {
    id: 20,
    title: "صندوق",
    content: (row) => String(row.isFund),
  },
  {
    id: 21,
    title: "سهام",
    content: (row) => String(row.isShare),
  },
  {
    id: 22,
    title: "نوع صندوق",
    content: (row) => row.fundType,
  },
  {
    id: 23,
    title: "URL",
    content: (row) => row.url,
  },
  {
    id: 24,
    title: "با بازدهی",
    content: (row) => String(row.hasReturn),
  },
  {
    id: 25,
    title: "نوع سهم",
    content: (row) => row.tradeType,
  },
  {
    id: 26,
    title: "نام مستعار",
    content: (row) => row.alias,
  },
  {
    id: 27,
    title: "نوع سایت",
    content: (row) => row.siteType,
  },
];
