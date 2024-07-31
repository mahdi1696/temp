/**
 *
 * @param input returns value, it can be string, number or null and undefined
 * @param defaultValue return value if the input was falsy
 * @returns convert the input with 2 digit after floating point and add percentage sign to it
 * and return a span element with colored text depending on the value of input, if bigger than zero returns green other wise red
 */
const returnsDecorator = (
  input: string | number | undefined | null,
  defaultValue: string | number = "--"
) => {
  if (typeof input === "number" || input) {
    const _input: number = typeof input == "string" ? Number(input) : input;

    if (Number.isNaN(_input)) {
      return defaultValue;
    }

    const withPercent = `${Math.abs(_input).toFixed(2)}٪${
      _input > 0 ? "" : "-"
    }`;
    if (_input > 0) {
      return <span className="text-green-600 ">{withPercent}</span>;
    }
    return <span className="text-red-400">{withPercent}</span>;
  }
  return defaultValue;
};
export default returnsDecorator;
