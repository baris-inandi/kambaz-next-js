function FullName({ first, last }: { first: string; last: string }) {
  return (
    <span>
      {last}, {first}
    </span>
  );
}

export default function FunctionDestructing() {
  return (
    <div id="wd-function-destructing">
      <h4>Destructing Function Parameters</h4>
      <FullName first="Jose" last="Annunziato" />
      <hr />
    </div>
  );
}
