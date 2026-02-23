import Image from "next/image";

export default function TailwindFilters() {
  return (
    <div>
      <h3>Blurs</h3>
      <div className="flex">
        <Image
          className="blur-none w-1/4"
          src="/images/angel-falls.jpg"
          alt="blur-none"
          width={400}
          height={300}
        />
        <Image
          className="blur-sm w-1/4"
          src="/images/angel-falls.jpg"
          alt="blur-sm"
          width={400}
          height={300}
        />
        <Image
          className="blur-lg w-1/4"
          src="/images/angel-falls.jpg"
          alt="blur-lg"
          width={400}
          height={300}
        />
        <Image
          className="blur-2xl w-1/4"
          src="/images/angel-falls.jpg"
          alt="blur-2xl"
          width={400}
          height={300}
        />
      </div>
    </div>
  );
}
