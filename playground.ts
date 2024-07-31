import prisma from "./prisma/db";
import {} from ".prisma/client";
import * as Prisma from "@prisma/client";
import { parseQueryString } from "./src/lib/queryString";

import {company} from "@prisma/client";


const sampleQuery: {
  id?: string;
  symbol?: string;
  namePersian?: string;
  isFund?: string;
  siteType?: string;
  quantity?: string;
  [key: string]: string | undefined;
} = {
  //id: "t:number;c:c;v:22",
  // symbol: "t:string;c:c;v:سرو",
  // namePersian: "t:string;c:c;v:namePersian",
  // isFund: "t:boolean;c:c;v:true",
  // siteType: "t:enum;c:c;v:Tadbir",
  quantity: "10",
};

const main = async () => {
  // const ss = CompanyScalarFieldEnum;
  // const ss = Prisma.Prisma.CompanyScalarFieldEnum;
  //console.log(ss);
 // const ss  : Prisma.Prisma.companyFieldRefs = {}
  
  const queryObject: Prisma.Prisma.companyWhereInput = {};
  const companyKeys = Object.keys(Prisma.Prisma.CompanyScalarFieldEnum);
  const queryKeys = Object.keys(sampleQuery);
  queryKeys.forEach((key) => {
    if (companyKeys.includes(key)) {
      const parseQuery = parseQueryString(sampleQuery[key]);
      switch (parseQuery?.t) {
        case "string":
          Object.assign(queryObject, { [key]: { contains: parseQuery?.v } });
          break;
        case "number":
          Object.assign(queryObject, { [key]: Number(parseQuery?.v) });
          break;
        case "boolean":
          Object.assign(queryObject, { [key]: Boolean(parseQuery?.v) });
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
  console.log(queryObject);

  //   const result = await prisma.company.findMany({
  //     // where: queryObject,
  //     where: {
  //       fip_iran_fund: {
  //         //every: { websiteAddress: { has: "sarvvcfund1.ir" } },
  //         some: {
  //           // symbol: "سرو",
  //           websiteAddress: {
  //             has: "sarv.fund",
  //           },
  //         },
  //       },
  //     },
  //     select: {
  //       symbol: true,
  //       companyCode: true,
  //       tsetmcId: true,
  //       namePersian: true,
  //       isFund: true,
  //       siteType: true,
  //       fip_iran_fund: {
  //         select: {
  //           websiteAddress: true,
  //         },
  //         /*   where: {
  //           websiteAddress: { has: "sarvvcfund1.ir" },
  //         }, */
  //       },
  //     },
  //   });

  const result = await prisma.fip_iran_fund.findMany({
    take: 10,
    skip: 2,
    where: {
      websiteAddress: { has: "sarv.fund" },
    },
  });
  console.dir(result, { depth: null });
};
main();
