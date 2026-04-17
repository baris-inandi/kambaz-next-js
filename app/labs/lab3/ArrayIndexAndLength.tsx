export default function ArrayIndexAndLength() {
  const numbers = [10, 20, 30, 40, 50];

  return (
    <div id="wd-array-index-and-length">
      <h4>Array Index and Length</h4>
      numbers = {numbers}
      <br />
      numbers[0] = {numbers[0]}
      <br />
      numbers[2] = {numbers[2]}
      <br />
      numbers.length = {numbers.length}
      <hr />
    </div>
  );
}
