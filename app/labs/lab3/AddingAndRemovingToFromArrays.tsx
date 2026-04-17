export default function AddingAndRemovingToFromArrays() {
  const numbers = [1, 2, 3, 4, 5];
  const adding = [...numbers, 6, 7];
  const removing = numbers.filter((n) => n !== 3);

  return (
    <div id="wd-adding-and-removing-arrays">
      <h4>Adding and Removing To/From Arrays</h4>
      numbers = {numbers}
      <br />
      adding = {adding}
      <br />
      removing = {removing}
      <hr />
    </div>
  );
}
