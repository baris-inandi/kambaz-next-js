export default function Spreader() {
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  const combined = [...arr1, ...arr2];

  const person = { firstName: "Jose", lastName: "Annunziato" };
  const personWithRole = { ...person, role: "Professor" };

  return (
    <div id="wd-spreader">
      <h4>The Spread Operator</h4>
      combined = {combined}
      <br />
      personWithRole = {JSON.stringify(personWithRole)}
      <hr />
    </div>
  );
}
