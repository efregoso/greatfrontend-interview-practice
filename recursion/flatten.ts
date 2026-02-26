// For https://www.greatfrontend.com/questions/javascript/flatten?practice=practice&tab=coding

type ArrayValue = any | Array<ArrayValue>;

export default function flatten(value: Array<ArrayValue>): Array<any> {
  // Recursive condition: when there are no more subarrays
  if (!value) {
    return [];
  }

  // Check element
  // if it is an element, push it
  // if it is an array, flatten it again
  let resultArray: Array<any> = [];
  for (const val of value) {
    // Check if an array or an element.
    if (!val?.length || typeof val === "string") {
      resultArray = resultArray.concat(val);
    } else {
      resultArray = resultArray.concat(flatten(val));
      // Value is an array or something else
      // Start with straightforward
    }
  }
  return resultArray;


  // Next time: Try 
}

