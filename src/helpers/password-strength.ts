/**
 * Password validator for login pages
 */
import value from 'assets/scss/_themes.module.scss';

/**
 * The function "hasNumber" checks if a given string contains a number.
 * @param number - The parameter "number" is a variable that represents a value that we want to check
 * if it contains a number.
 */
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

/**
 * The function checks if a given number contains both lowercase and uppercase letters.
 * @param number - The `number` parameter is a value that is being checked for the presence of both
 * lowercase and uppercase letters.
 */
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

/**
 * The function "hasSpecial" checks if a given number contains any special characters.
 * @param number - The parameter "number" is a variable that represents a string or number that you
 * want to check for the presence of special characters.
 */
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

/**
 * The function `strengthColor` takes a count as input and returns an object with a label and color
 * based on the count value.
 * @param count - The `count` parameter represents the strength level of something. It is used to
 * determine the label and color associated with the strength level.
 * @returns The function `strengthColor` returns an object with two properties: `label` and `color`.
 * The values of these properties depend on the value of the `count` parameter passed to the function.
 */
export const strengthColor = (count) => {
  if (count < 2) return { label: 'Poor', color: value.errorMain };
  if (count < 3) return { label: 'Weak', color: value.warningDark };
  if (count < 4) return { label: 'Normal', color: value.orangeMain };
  if (count < 5) return { label: 'Good', csolor: value.successMain };
  if (count < 6) return { label: 'Strong', color: value.successDark };
  return { label: 'Poor', color: value.errorMain };
};

/**
 * The function calculates the strength of a given number based on its length, presence of numbers,
 * special characters, and mixed case.
 * @param number - The `number` parameter in the `strengthIndicatorNumFunc` function represents the
 * input string that you want to evaluate the strength of. It is assumed that this input string is a
 * password or a similar type of sensitive information.
 * @returns the number of strength indicators for a given input number.
 */
export const strengthIndicatorNumFunc = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};
