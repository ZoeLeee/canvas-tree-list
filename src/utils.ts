/**
 * 让num值在min～max之间
 * @param num
 * @param min
 * @param max
 * @returns
 */
export const clamp = (num: number, min: number, max: number) =>
	Math.min(Math.max(num, min), max);
