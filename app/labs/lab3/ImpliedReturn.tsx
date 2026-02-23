export default function ImpliedReturn() {
  const add = (a: number, b: number) => a + b;
  const square = (a: number) => a * a;
  const fullName = (first: string, last: string) => `${first} ${last}`;

  return (
    <div id="wd-implied-return">
      <h4>Implied Return</h4>
      add(2, 3) = {add(2, 3)}
      <br />
      square(5) = {square(5)}
      <br />
      fullName(&quot;Web&quot;, &quot;Dev&quot;) = {fullName("Web", "Dev")}
      <hr />
    </div>
  );
}
