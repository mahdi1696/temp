export const mapFundTypeToPersianName = (fundType: number) => {
  switch (fundType) {
    case 4:
      return "درآمد ثابت";

    case 5:
      return "کالایی";

    case 6:
      return "سهامی";

    case 7:
      return "مختلط";

    case 11:
      return "اختصاصی بازارگردانی";

    case 12:
      return "جسورانه";

    case 13:
      return "پروژه‌ای";

    case 14:
      return "زمین و ساختمان";

    case 16:
      return "خصوصی";

    case 17:
      return "صندوق در صندوق";

    case 18:
      return "املاک و مستغلات";

    default:
      return "";
  }
};
