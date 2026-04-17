export default function JsonStringify() {
  const numbers = [1, 2, 3];
  const names = ["Web", "Dev", "Course"];

  return (
    <div id="wd-json-stringify">
      <h4>JSON Stringify</h4>
      {JSON.stringify(numbers)}
      <br />
      {JSON.stringify(names)}
      <hr />
    </div>
  );
}
