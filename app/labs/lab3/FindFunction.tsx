export default function FindFunction() {
  const numbers = [11, 22, 33, 44, 55];
  const firstGreaterThan30 = numbers.find((n) => n > 30);
  const firstEven = numbers.find((n) => n % 2 === 0);

  return (
    <div id="wd-find-function">
      <h4>The Find Function</h4>
      firstGreaterThan30 = {firstGreaterThan30}
      <br />
      firstEven = {firstEven}
      <hr />
    </div>
  );
}
