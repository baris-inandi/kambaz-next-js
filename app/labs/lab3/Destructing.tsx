export default function Destructing() {
  const person = {
    firstName: "Jose",
    lastName: "Annunziato",
    age: 34,
  };
  const { firstName, age } = person;

  const numbers = [100, 200, 300, 400];
  const [n1, n2] = numbers;

  return (
    <div id="wd-destructing">
      <h4>Destructing</h4>
      firstName = {firstName}
      <br />
      age = {age}
      <br />
      n1 = {n1}, n2 = {n2}
      <hr />
    </div>
  );
}
