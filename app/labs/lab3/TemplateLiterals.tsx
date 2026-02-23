export default function TemplateLiterals() {
  const firstName = "Jose";
  const lastName = "Annunziato";
  const section = "S101";
  const seat = 129;
  const result1 = `${lastName}, ${firstName}`;
  const result2 = `${section}-${seat}`;
  const result3 = `${firstName} ${lastName} is in section ${section}`;

  return (
    <div id="wd-template-literals">
      <h4>Template Literals</h4>
      {result1}
      <br />
      {result2}
      <br />
      {result3}
      <hr />
    </div>
  );
}
