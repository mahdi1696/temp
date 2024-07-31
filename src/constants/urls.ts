export const BaseUrl = "http://localhost:3001/";

//export const BaseUrl = "https://www.isandogh.com/api/";

//===============Funds returns
const statistic = "statistic";
export const GetAllFundsReturnsUrl = BaseUrl + statistic + "/returnsTable";

//===============watchList
const watchList = "watchList";
export const getFundsWatchListUrl = BaseUrl + watchList + "/funds";

//===============authentication
const Authentication = "authentication";
export const LoginUrl = BaseUrl + Authentication + "/login";

//===============company
const Company = "company";
export const company_post_search_url =
  BaseUrl + Company + "/searchCompanyWithType";
export const company_post_update_url =
  BaseUrl + Company + "/updateCompanyWithType";
export const company_get_allFunds_url =
  BaseUrl + Company + "/getAllFundsFromDb";
export const company_post_getInFoFromTsetmc_url =
  BaseUrl + Company + "/getInfoFromTsetmc";
export const company_post_insertInstrument_url =
  BaseUrl + Company + "/insertCompany";
export const company_post_delete_url = BaseUrl + Company + "/delete";

//===============letters
const Letter = "letter";
export const letters_get_ByFundsId_url =
  BaseUrl + Letter + "/getLettersByFundId";

export const letters_post_DbAndCodalLettersDiff =
  BaseUrl + Letter + "/checkForNewLetters";

export const letters_post_insert = BaseUrl + Letter + "/insertNewLetter";

//===============portfolio
const Portfolio = "portfolio";
export const GetPortfolioUrl = BaseUrl + Portfolio + "/getPortfolio";
export const UpdatePortfolioRowUrl = BaseUrl + Portfolio + "/updateRow";
export const DeletePortfolioRowUrl = BaseUrl + Portfolio + "/deleteRow";
export const AddRowToPortfolioUrl = BaseUrl + Portfolio + "/addRow";
export const DeletePortfolioUrl = BaseUrl + Portfolio + "/deleteFundsPortfolio";
export const InsertPortfolioUrl =
  BaseUrl + Portfolio + "/insertFundsPortfolioRows";
export const portfolio_parseReportExcelAndGetPortfolioWithStockSuggestion_url =
  BaseUrl + Portfolio + "/parseReportExcelAndGetPortfolioWithStockSuggestion";

//===============data manger
const DataManager = "dataManager";
export const dataManager_get_allFundsLastTradeInfo =
  BaseUrl + DataManager + "/getAllFundsLastTradeInfo";

export const dataManager_get_allFundsLastNAV_url =
  BaseUrl + DataManager + "/getAllFundsLastNAV";

export const dataManager_get_syncFundsTradeInfoUrl =
  BaseUrl + DataManager + "/syncFundsTradeInfo";

export const dataManager_post_syncFundsTradeInfoByTsetmcId_Url =
  BaseUrl + DataManager + "/syncFundsTradeInfoByTsetmcId";

export const dataManager_get_syncFundsNav_url =
  BaseUrl + DataManager + "/syncFundsNav";

export const dataManager_post_syncFipIranNAVByTsetmcIds_url =
  BaseUrl + DataManager + "/syncFipIranNAVByTsetmcIds";

//=============job
const Job = "job";
export const job_get_watchListJobInfo = BaseUrl + Job + "/info";
export const job_post_startWatchListJob = BaseUrl + Job + "/start";
export const job_get_stopWatchListJob = BaseUrl + Job + "/stop";

//=============date
const Date = "date";

export const date_get_holidaysByPersianYear =
  BaseUrl + Date + "/getHolidayByPersianYear";
export const date_delete_deleteHolidayById =
  BaseUrl + Date + "/deleteHolidayById";
export const date_post_addHoliday = BaseUrl + Date + "/addHoliday";
