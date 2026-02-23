export default function LegacyFunctions() {
  function add(a: number, b: number) {
    return a + b;
  }

  function subtract(a: number, b: number) {
    return a - b;
  }

  return (
    <div id="wd-legacy-functions">
      <h4>Legacy Functions</h4>2 + 4 = {add(2, 4)}
      <br />5 - 3 = {subtract(5, 3)}
      <hr />
    </div>
  );
}
