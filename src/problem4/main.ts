export const sum_to_n_a = (n: number): number => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
      sum += i;
  }
  return sum;
};

export const sum_to_n_b = (n: number): number => {
  return (n * (n + 1)) / 2;
};

export const sum_to_n_c = (n: number): number => {
  if (n <= 0) return 0; // Handle the base case
  return n + sum_to_n_c(n - 1); // Recursive call
};

console.log(sum_to_n_a(5)); // Outputs: 15
console.log(sum_to_n_b(5)); // Outputs: 15
console.log(sum_to_n_c(5)); // Outputs: 15