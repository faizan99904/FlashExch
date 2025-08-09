const BASE_URL = 'https://betever365.com';
// const BASE_URL = 'https://infiexch.com';

// const BASE_URL = ''

export const CONFIG = {
  miniCasinoIframeUrl: 'https://minicasino.ludoexchange.com',

  siteKey: '2',
  SiteName: 'Exchange',
  SportsList: BASE_URL + '/api/exchange/sports/sportsList',
  SportsListTime: 1440,
  SearchEventList: BASE_URL + '/api/exchange/events/searchEventList',
  SearchEventListTime: 1440,
  getIpLocation: 'https://pro.ip-api.com/json/?key=qSA5ctYZHdWsx04',
  getAllEventsList: BASE_URL + '/api/exchange/market/matchodds/allEventsList',
  getAllEventsListTime: 20,
  exchangeTypeList: BASE_URL + '/api/exchange/exchangeTypeList',
  exchangeTypeListTime: 1440,
  specialEvents: BASE_URL + '/api/exchange/navigations/specialEvents',
  specialEventsTime: 20,
  casinoEvents: BASE_URL + '/api/exchange/navigations/casinoEvents',
  casinoEventsTime: 120,
  sidebarEvents: 'sidebarEvents',
  inplayEvents:'inplayEvents',
  sendUserRegisterOtp: BASE_URL + '/app/user/userRegisterOtpSent',
  verifyUserRegisterOtp: BASE_URL + '/app/user/userRegisterVerify',
  sendForgotPasswordOtp: BASE_URL + '/app/users/sendForgotPasswordOtp',
  verifyForgotPassword: BASE_URL + '/app/user/userForgotPasswordVerify',
  livCasinoList: BASE_URL + '/api/exchange/navigations/casinoEvents',
  userLogin: BASE_URL + '/app/users/userLogin',
  userAccountStatement: BASE_URL + '/app/exchange/users/userAccountStatement',
  userBalance: BASE_URL +"/app/exchange/users/userBalance",
  changedPasswordHistory:
    BASE_URL + '/app/exchange/users/changedPasswordHistory',
  userChangePassword: BASE_URL + '/app/exchange/users/userChangePassword',

  userSettledBetList:
    BASE_URL + '/app/exchange/users/betlist/userSettledBetList',
  userActivityLogs: BASE_URL + '/app/exchange/users/userActivityLogs',
  userBetStakeList: BASE_URL + '/app/exchange/users/userBetStakeList',
  updateUserBetStake: BASE_URL + '/app/exchange/users/updateUserBetStake',
  getThemeConfig: BASE_URL + '/api/exchange/theme/getThemeConfig',
  getThemeConfigTime: 1440,
  userSportsProfitloss:
    BASE_URL + '/app/exchange/users/pl/userSportsProfitloss',

  userProfile: BASE_URL + '/app/exchange/users/userProfile',
  betsRollingCommission:
    BASE_URL + '/app/exchange/users/commission/betsRollingCommission',

  userMarketsProfitloss:
    BASE_URL + '/app/exchange/users/pl/userMarketsProfitloss',
  userEventsProfitloss:
    BASE_URL + '/app/exchange/users/pl/userEventsProfitloss',
  getUserBetList: BASE_URL + '/app/exchange/users/betlist/getUserBetList',
  getMarketsEventList: BASE_URL + '/api/exchange/markets/getMarketsEventList',

  fancyMarketList: BASE_URL + '/api/exchange/markets/fancyMarketList',
  fancyMarketListTime: 1440,

  getBallByBallMarket: BASE_URL + '/api/exchange/markets/getBallByBallMarket',
  getMarketEventResults:
    BASE_URL + '/api/exchange/results/getMarketEventResults',

  getMatchOddsPl: BASE_URL + '/app/exchange/users/pl/getMatchOddsPl',
  getFancyPl: BASE_URL + '/app/exchange/users/pl/getFancyPl',
  getSportsbookPl: BASE_URL + '/app/exchange/users/pl/getSportsbookPl',
  getBookmakersPl: BASE_URL + '/app/exchange/users/pl/getBookmakersPl',

  getDepositDetails: BASE_URL + '/app/exchange/users/getDepositDetails',
  createDepositTransaction:
    BASE_URL + '/app/exchange/users/uploadPaymentDetails',
  placebet: BASE_URL + '/app/exchange/users/placebet',

  latestWithdrawalList: BASE_URL + '/app/exchange/users/getWithdrawalList',
  addWithdrawalBank: BASE_URL + '/app/exchange/users/addWithdrawalBank',
  deleteWithdrawBank:
    BASE_URL + '/app/exchange/users/deleteWithdrawalBankDetails',
  userWithdrawBankList:
    BASE_URL + '/app/exchange/users/getWithdrawalBankDetails',
  calculateWithdrawAmt:
    BASE_URL + '/app/exchange/users/calculateWithdrawalAmount',
  withdrawalRequest: BASE_URL + '/app/exchange/users/withdrawalRequest',
  racingEventsList: BASE_URL + '/api/exchange/events/racingEventsList',
  racingEventsListTime: 20,
  eventMatchedBetList:
    BASE_URL + '/app/exchange/users/betlist/eventMatchedBetList',

  videoStreamURL: BASE_URL + '/api/exchange/streaming/exchEventsStreaming',

  marketFancyBook: BASE_URL + '/app/exchange/users/pl/marketFancyBook',
  getUserExposureEventName: BASE_URL + '/app/exchange/users/userEventsExposure',

  cancelWithdrawalRequest:
    BASE_URL + '/app/exchange/users/withdraw/cancelWithdrawalRequest',
  getTransferCharges:
    BASE_URL + '/app/exchange/users/transfer/getTransferCharges',
  getUserReward: BASE_URL + '/app/exchange/users/getUserReward',
  getUserAmountSettlement:
    BASE_URL + '/app/exchange/users/getUserAmountSettlement',
  getReferralCode: BASE_URL + '/app/exchange/users/getReferralCode',

  getSportsRule: BASE_URL + '/api/exchange/rules/getSportsRule',
  getCustomerSupport: BASE_URL + '/app/users/supports/getCustomerSupport',
  getCustomerSupportTime: 20,
  // getCustomerSupportTime: 1,
  virtualSportsList: BASE_URL + '/api/exchange/sports/virtualSportsList',
  virtualSportsListTime: 30,
  sliderList: BASE_URL + '/api/exchange/slider/sliderList',
  sliderListTime: 20,
  exchangeNews: BASE_URL + '/api/exchange/news/exchangeNews',
  exchangeNewsTime: 20,

  userLogout: BASE_URL + '/app/exchange/users/userLogout',

  userSettleBetListCustomURL:
    BASE_URL + '/app/exchange/users/betlist/mobile/settledBetList',
  userUnSettleBetListCustomURL:
    BASE_URL + '/app/exchange/users/betlist/mobile/unSettledBetList',

  tipsPreviewList: BASE_URL + '/api/exchange/tips/tipsPreviewList',
  tipsPreviewListTime: 30,
  internationalCasinoList:
    BASE_URL + '/api/exchange/navigations/internationalCasinoList',
  internationalCasinoListTime: 1440,

  lotterySportsList: BASE_URL + '/api/exchange/sports/lotterySportsList',
  lotterySportsListTime: 20,
  lotteryPlaceBet: BASE_URL + '/app/exchange/users/lotteryPlaceBet',
  getLotteryPl: BASE_URL + '/app/exchange/users/pl/getLotteryPl',
  // b2c
  userRegisterOtpSent: BASE_URL + '/app/user/userRegisterOtpSent',
  userRegisterVerify: BASE_URL + '/app/user/userRegisterVerify',
  userForgotPasswordVerify: BASE_URL + '/app/user/userForgotPasswordVerify',
  getDepositStatus: BASE_URL + '/app/exchange/users/getDepositStatus',

  createAutoPaymentOrder:
    BASE_URL + '/app/exchange/users/deposit/createPaymentOrder',
  createPaymentLink: BASE_URL + '/app/exchange/users/deposit/createPaymentLink',
  successWithdrawalReceipt:
    BASE_URL + '/app/exchange/users/withdraw/successWithdrawalReceipt',

  casinoMainList: BASE_URL + '/api/exchange/navigations/casino/casinoMainList',
  casinoMainListTime: 120,

  casinoTableList:
    BASE_URL + '/api/exchange/navigations/casino/casinoTableList',
  casinoTabList: BASE_URL + '/api/exchange/navigations/casino/casinoTabList',

  lotterySportList: BASE_URL + '/api/exchange/sports/lotterySportsList',
};

export const STACK_VALUE = [
  {
    stakeName: '100',
    stakeAmount: '100',
  },
  {
    stakeName: '200',
    stakeAmount: '200',
  },
  {
    stakeName: '500',
    stakeAmount: '500',
  },
  {
    stakeName: '5000',
    stakeAmount: '5000',
  },
  {
    stakeName: '10000',
    stakeAmount: '10000',
  },
  {
    stakeName: '25000',
    stakeAmount: '25000',
  },
  {
    stakeName: '50000',
    stakeAmount: '50000',
  },
  {
    stakeName: '100000',
    stakeAmount: '100000',
  },
];
