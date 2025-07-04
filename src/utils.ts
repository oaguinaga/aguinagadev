type PlainObject = Record<string, unknown>;

export function range(start: number, end?: number, step: number = 1) {
  const output: number[] = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
}

// This method is like `transformValues`, except we can change both the value *and* keys.
export function transformObject(obj: PlainObject, callback: (key: string, value: unknown) => [string, unknown]) {
  if (typeof obj !== "object") {
    return obj;
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const [newKey, newValue] = callback(key, value);
    return {
      ...acc,
      [newKey]: newValue,
    };
  }, {});
}

export function sampleOne<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function sample<T>(arr: Array<T>, len = 1): Array<T> {
  const output = [];

  for (let i = 0; i < len; i++) {
    output.push(sampleOne(arr));
  }

  return output;
}

export function random(min: number, max: number, { rounded }: { rounded: boolean } = { rounded: true }) {
  const partialVal = Math.random() * (max - min);

  if (rounded) {
    return Math.floor(partialVal) + min;
  } else {
    return partialVal + min;
  }
}

export function sum(values: Array<number>) {
  return values.reduce((sum, value) => sum + value, 0);
}

export const mean = (values: Array<number>) => sum(values) / values.length;

export function clamp(value: number, min = 0, max = 1) {
  // We might be passing in "inverted" values, eg:
  //    clamp(someVal, 10, 5);
  //
  // This is especially common with `clampedNormalize`.
  // In these cases, we'll flip the min/max so that the function works as expected.
  const actualMin = Math.min(min, max);
  const actualMax = Math.max(min, max);

  return Math.max(actualMin, Math.min(actualMax, value));
}

export function roundTo(value: number, places = 0) {
  return Math.round(value * 10 ** places) / 10 ** places;
}

export function roundToNearest(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function slugify(str = "") {
  let slug = str
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-z0-9-]/gi, "");

  // Replace all numbers with their word counterpart
  slug = replaceDigits(slug);

  return slug;
}
export const isEmpty = (obj: object) => Object.keys(obj).length === 0;

export function camelToDashCase(val: string) {
  return val.replace(/[A-Z0-9]/g, (letter: string) => `-${letter.toLowerCase()}`);
}

export function dashToCamelCase(val: string) {
  return val.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function capitalize(value: string) {
  return value[0].toUpperCase() + value.slice(1);
}

export function capitalizeSentence(value: string) {
  return value
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function hyphenate(value: string) {
  return value.replace(/([A-Z])/g, "-$1").toLowerCase();
}

export function delay(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

export function getTimeOfDay() {
  const now = new Date();
  const hourOfDay = now.getHours();

  if (hourOfDay <= 4) {
    return "night";
  } else if (hourOfDay <= 11) {
    return "morning";
  } else if (hourOfDay <= 17) {
    return "afternoon";
  } else if (hourOfDay <= 21) {
    return "evening";
  } else {
    return "night";
  }
}

/**
 * input:  "js,cat cat,  bee, dog"
 * output: ['js', 'cat cat', 'bee', 'dog']
 */
export function splitCommaSeparatedArray(value: string) {
  return value.replace(/,\s+/g, ",").split(",");
}

// In a string, turn digits (1) into spelled words (one)
export function replaceDigits(value: string) {
  return value
    .replace(/1/g, "one")
    .replace(/2/g, "two")
    .replace(/3/g, "three")
    .replace(/4/g, "four")
    .replace(/5/g, "five")
    .replace(/6/g, "six")
    .replace(/7/g, "seven")
    .replace(/8/g, "eight")
    .replace(/9/g, "nine")
    .replace(/0/g, "zero");
}
