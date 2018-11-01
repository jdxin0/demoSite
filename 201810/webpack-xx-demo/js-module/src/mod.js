export function square(x) {
    return x * x;
}
export function cube(x) {
    return x * x * x;
}
export function add(x, y) {
    return x + y;
}
export function hidePhoneNum(num) {
    return String(num).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}
export function hideEmailSec(email) {
    return String(email).replace(/(.{2}).+(.{2}@.+)/, '$1****$2');
}