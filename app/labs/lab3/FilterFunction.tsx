export default function FilterFunction() {
  const numbers = [1, 2, 3, 4, 5, 6];
  const evens = numbers.filter((n) => n % 2 === 0);
  const odds = numbers.filter((n) => n % 2 !== 0);

  return (
    <div id="wd-filter-function">
      <h4>The Filter Function</h4>
      evens = {evens}
      <br />
      odds = {odds}
      <hr />
    </div>
  );
}
