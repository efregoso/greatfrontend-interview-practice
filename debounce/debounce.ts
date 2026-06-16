/*
 * Debounce
 * https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/debounce
 * 
 * @param {(...args: Array<unknown>) => unknown} func
 * @param {number} wait
 * @returns {(...args: Array<unknown>) => void}
 */
export default function debounce(func, wait) {
  let timer;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, wait);
  };
}
