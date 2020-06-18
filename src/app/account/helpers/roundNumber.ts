export function roundToXDigits(value, digits) {
    if (!digits){
        digits = 2;
    }
    value = value * Math.pow(10, digits);
    value = Math.round(value);
    value = value / Math.pow(10, digits);
    return value;
}
