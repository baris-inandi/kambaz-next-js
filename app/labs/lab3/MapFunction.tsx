export default function MapFunction() {
  const numberArray = [1, 2, 3, 4, 5];
  const squares = numberArray.map((n) => n * n);

  return (
    <div id="wd-map-function">
      <h4>The Map Function</h4>
      {numberArray} mapped to {squares}
      <hr />
    </div>
  );
}
