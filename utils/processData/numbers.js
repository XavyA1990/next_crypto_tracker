export const formatLargeNumber = (input) => {

    let number = typeof input === 'string' ? parseFloat(input) : input;

    if (isNaN(number)) return input;

    if (number < 1e3) return number;

    if (number >= 1e3 && number < 1e6) return +(number / 1e3).toFixed(2) + 'K';

    if (number >= 1e6 && number < 1e9) return +(number / 1e6).toFixed(2) + 'M';

    if (number >= 1e9 && number < 1e12) return +(number / 1e9).toFixed(2) + 'B';

    if (number >= 1e12) return +(number / 1e12).toFixed(2) + 'T';

    return number.toFixed(2);

}