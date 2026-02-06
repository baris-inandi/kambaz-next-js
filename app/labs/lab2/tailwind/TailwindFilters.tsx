export default function TailwindFilters() {
  return (
    <div>
      <h3>Blurs</h3>
      <div className="flex">
        <img
          className="blur-none w-1/4"
          src="/images/angel-falls.jpg"
          alt="blur-none"
        />
        <img
          className="blur-sm w-1/4"
          src="/images/angel-falls.jpg"
          alt="blur-sm"
        />
        <img
          className="blur-lg w-1/4"
          src="/images/angel-falls.jpg"
          alt="blur-lg"
        />
        <img
          className="blur-2xl w-1/4"
          src="/images/angel-falls.jpg"
          alt="blur-2xl"
        />
      </div>
    </div>
  );
}
