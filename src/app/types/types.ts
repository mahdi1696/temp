//================= data table
interface DataTableColumn<T> {
  id: number | string;
  title: string;
  content?: (row: T) => any;
  sortable?: boolean;
  onCellClick?: (row: T) => void;
  boldOnChange?: (row: T) => number | "-";
  getValue?: (item: T) => string | number;
  extraClass?: (row: T) => string;
  extraStyle?: (row: T) => {};
  headerClass?: string;
  columnsClass?: string;
  thDivClass?: string;
  useTooltip?: boolean;
  usePercentage?: boolean;
  toNumberWithCommas?: boolean;
  toHumanReadableNumber?: boolean;
  sortType?: string;
  monospace?: boolean;
  headerGroup?: boolean;
  span?: number;
}

interface PaginationInfo {
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
//=================
interface FundReturnTable {
  info: {
    seven: {
      fromPDate: string;
      toPDate: string;
    };
    thirty: {
      fromPDate: string;
      toPDate: string;
    };
    ninety: {
      fromPDate: string;
      toPDate: string;
    };
    sixMon: {
      fromPDate: string;
      toPDate: string;
    };
    year: {
      fromPDate: string;
      toPDate: string;
    };
  };
  returns: {
    info: {
      symbol: string;
      tsetmcId: string;
      fundType: number;
      companyId: number;
    };
    seven: Returns;
    thirty: Returns;
    ninety: Returns;
    sixMon: Returns;
    year: Returns;
  }[];
}

type Returns =
  | {
      closePrice: string | number;
      tradePrice: string | number;
    }
  | string;

interface WatchListItem {
  tradeInfo?: WatchListTradeInfo;
  bids?: Bids;
  clientType?: ClientType;
  fipIran: {
    id: number;
    companyId: number;
    symbol: string;
    tsetmcId: string;
    regNo: string;
    name: string;
    fundType: number;
    typeOfInvest: string;
    dividendIntervalPeriod: number;
  };
}

interface Buyer {
  row: number;
  quantity: number;
  volume: number;
  buyPrice: number;
  [key: string]: number;
}

interface Seller {
  row: number;
  quantity: number;
  volume: number;
  sellPrice: number;
  [key: string]: number;
}

interface Bids {
  tsetmcId: string;
  buyers: Buyer[];
  sellers: Seller[];
}

interface ClientType {
  tsetmcId: string;
  naturalPersonBuyerVolume: number;
  naturalPersonSellerVolume: number;
  naturalPersonBuyerQuantity: number;
  naturalPersonSellerQuantity: number;
  legalPersonBuyerVolume: number;
  legalPersonSellerVolume: number;
  legalPersonBuyerQuantity: number;
  legalPersonSellerQuantity: number;
  [key: string]: string | number | undefined | null;
}

interface WatchListTradeInfo extends TradeInfo {
  tsetmcId: string; //1
  irCode: string; //2
  symbol: string; //3
  companyName: string; //4
  lastUpDateTime: string; //5
  eps?: number | null; //15
  industryCode?: string; //19
  [key: string]: string | number | undefined | null;
}

interface TradeInfo {
  symbol?: string; //3
  openPrice: number; //6
  closePrice: number; //7
  tradePrice: number; //8
  tradeQuantity: number; //9
  tradesVolume: number; //10
  tradesValue: number; //11
  minPrice: number; //13
  maxPrice: number; //12
  maxAllowedPrice?: number; // 20
  minAllowedPrice?: number; //21
  yesterdayPrice: number; //14
  date?: string;
  companyId?: number;
  nav?: number;
  [key: string]: string | number | undefined | null;
}

interface Company {
  id: number;
  namePersian: string;
  nameDisplay: string;
  symbolLong: string;
  symbol: string;
  symbolCode: string;
  symbolFiveCode: string;
  companyCode: string;
  companyFourCode: string;
  industryCode: string;
  industryName: string;
  subIndustryCode: string;
  subIndustryName: string;
  market: string;
  boardCode: string;
  tsetmcId: string;
  name: string;
  isArchive: boolean;
  isActive: boolean;
  isFund: boolean;
  isShare: boolean;
  fundType: number;
  url: string;
  siteType: string;
  hasReturn?: boolean | null;
  tradeType: number;
  alias?: string | null;
  codalSymbol: string;
  realFundType?: RealFundType;
}

type FundListItem = {
  id: number;
  symbol: string;
  fundType: number;
  url: string | null;
  siteType: string;
  realFundType?: RealFundType;
};

enum RealFundType {
  ETF = "ETF",
  FixIncome = "FixIncome",
  Index = "Index",
  Mix = "Mix",
  ETC = "ETC",
  Sector = "Sector",
  Leverage = "Leverage",
  FOF = "FOF",
  Venture = "Venture",
}

interface Letter {
  id: number;

  //which company this letter belong to
  //=======================
  companyId: number;

  //report that this letter has
  //======================
  reportId?: number;
  //======================

  tracingNo: number;

  symbol: string;

  companyName: string;

  title: string;

  letterCode: string;

  sentDateTime: string;

  publishDateTime: string;

  hasHTML: boolean;

  isEstimate: boolean;

  url: string;

  hasExcel: boolean;

  hasPDF: boolean;

  //cspell:disable-next-line
  hasXbrl: boolean;

  hasAttachment: boolean;

  attachmentUrl: string;

  pdfUrl: string;

  excelUrl: string;

  //cspell:disable-next-line
  xbrlUrl: string;

  //cspell:disable-next-line
  tedanUrl: string;

  fileUrl: string;

  filePath: string;

  persianDate: string;

  date: Date;

  publishDate: Date;

  isCorrection?: boolean;

  reportFile?: Buffer;
}

type FundCompanySuggestion = {
  portfolioRow: IFundPortfolioTrade;
  suggestion: CompareType | null;
};

interface IFundPortfolioTradeBase {
  id?: number;
  letterId?: number;
  stockId?: number | null;
  company: string;
  startQuantity: number;
  startValue: number;
  startSellValue: number;
  buyQuantity: number;
  buyValue: number;
  sellQuantity: number;
  sellValue: number;
  endQuantity: number;
  priceInMarket?: number | null;
  endValue: number;
  endSellValue: number;
  startValuePercent?: number;
  endValuePercent?: number;
  percentOfAllProperty?: number | null;
}

type IFundPortfolioTrade = IFundPortfolioTradeBase & {
  [key: string]: number | string | null | undefined;
};

interface PortfolioRow extends IFundPortfolioTradeBase {
  fundId: number;
  reportId: number;
  date: Date;
  [key: string]: number | string | null | undefined | Date;
}

type FundCompanySuggestionWithId = FundCompanySuggestion & { id: number };

type CompareType = {
  stock: StockSlice;
  compare: {
    like: number;
    companyArrLength: number;
    companyStringLength: number;
    stockStringLength: number;
  };
  company: string;
};

type StockSlice = {
  id: number;
  symbol: string;
  symbolLong: string;
  namePersian: string;
  nameDisplay: string;
  tradeType: number | null;
  alias?: string[];
};

type Diff = {
  symbolId: SymbolId;
  diff: Letter[];
};

type SymbolId = {
  codalSymbol: string;
  id: number;
};

interface StockTradeInfo {
  id: number;
  companyId: number;
  symbol: string;
  tsetmcId: string;
  lastUpdateTime?: string | null;
  openPrice: number;
  closePrice: number;
  tradePrice: number;
  tradeQuantity: number;
  tradesVolume: number;
  tradesValue: number;
  minPrice: number;
  maxPrice: number;
  yesterdayPrice: number;
  eps?: number | null;
  maxAllowedPrice?: number | null;
  minAllowedPrice?: number | null;
  nav?: number | null;
  date: string;
}

type SyncInfo = {
  success: boolean;
  symbol: string;
  tsetmcId: string;
  message: string;
};

type SyncResult = {
  quantity: number;
  successQuantity: number;
  failureQuantity: number;
  success: SyncInfo[];
  failure: SyncInfo[];
};

interface FipIranFundNav {
  id: number;

  companyId: number;

  regNo: string;

  tsetmcId: string;

  date: string;

  issueNav: number;

  cancelNav: number;

  statisticalNav: number;

  netAsset: number;
}

interface FipIranFund {
  id?: number;

  companyId: number;

  company?: Company;

  symbol: string;

  tsetmcId: string;

  //===============

  smallSymbolName: string;

  regNo: string;

  name: string;

  fundType: number;

  //there are two types 1-IssuanceAndCancellation and 2-Negotiable
  typeOfInvest: "IssuanceAndCancellation" | "Negotiable";

  fundSize?: number;

  initiationDate: string | Date;

  dividendIntervalPeriod?: number;

  guaranteedEarningRate?: number;

  netAsset?: number;

  estimatedEarningRate?: number;

  investedUnits?: number;

  websiteAddress: string[];

  manager: string;

  auditor: string;

  custodian: string;

  guarantor: string;

  isCompleted: boolean;
}

interface GetWatchListOptions {
  getPriceInfo?: boolean;
  getBids?: boolean;
  getIndexInfo?: boolean;
}

interface StartOptions extends GetWatchListOptions {
  interval: number;
  getClientType: boolean;
  fundsTsetmcId?: string[];
  getFipIranNavs?: boolean;
}

type JobStatus = {
  message: string;
  date: Date | null;
};
interface WatchListJobInfo {
  isRunning: boolean;
  isPaused: boolean;
  startTime: string;
  pauseTime: string;
  options: Omit<StartOptions, "fundsTsetmcId">;
  startJobStatus: JobStatus;
  stopJobStatus: JobStatus;
  lastStatusMessage: string;
  lastErrorMessage: any;
  lastStatusDate?: Date;
}

interface Holiday {
  id: number;
  date: Date;
  pDate: string;
}
