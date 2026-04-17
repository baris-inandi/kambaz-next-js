export default function House() {
  const house = {
    bedrooms: 2,
    bathrooms: 1,
    address: {
      street: "123 Elm St",
      city: "Boston",
      state: "MA",
    },
    owner: "Tony Stark",
    forSale: false,
  };

  console.log(house);

  return (
    <div id="wd-house">
      <h4>JavaScript Object Notation (JSON)</h4>
      <pre>{JSON.stringify(house, null, 2)}</pre>
      <hr />
    </div>
  );
}
