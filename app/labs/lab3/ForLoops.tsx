export default function ForLoops() {
  const numberArray = [1, 2, 3, 4, 5];
  const squares: number[] = [];

  for (let i = 0; i < numberArray.length; i += 1) {
    squares.push(numberArray[i] * numberArray[i]);
  }

  return (
    <div id="wd-for-loops">
      <h4>For Loops</h4>
      numberArray = {numberArray}
      <br />
      squares = {squares}
      <hr />
    </div>
  );
}
