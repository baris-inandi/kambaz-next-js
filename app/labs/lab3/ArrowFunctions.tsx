export default function ArrowFunctions() {
  const add = (a: number, b: number) => a + b;
  const subtract = (a: number, b: number) => a - b;
  const square = (a: number) => a * a;

  return (
    <div id="wd-arrow-functions">
      <h4>Arrow Functions</h4>3 + 6 = {add(3, 6)}
      <br />9 - 5 = {subtract(9, 5)}
      <br />
      square(4) = {square(4)}
      <hr />
    </div>
  );
}
