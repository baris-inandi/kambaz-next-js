export default function FindIndex() {
  const names = ["Alice", "Bob", "Charlie", "Diana"];
  const charlieIndex = names.findIndex((name) => name === "Charlie");
  const missingIndex = names.findIndex((name) => name === "Eve");

  return (
    <div id="wd-find-index">
      <h4>The Find Index Function</h4>
      charlieIndex = {charlieIndex}
      <br />
      missingIndex = {missingIndex}
      <hr />
    </div>
  );
}
