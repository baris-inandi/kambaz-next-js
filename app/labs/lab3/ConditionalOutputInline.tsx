export default function ConditionalOutputInline() {
  const loggedIn = true;

  return (
    <div id="wd-conditional-output-inline">
      <h4>Conditional Output Inline</h4>
      {loggedIn && (
        <h5 id="wd-conditional-output-inline-welcome">Welcome Inline</h5>
      )}
      {!loggedIn && (
        <h5 id="wd-conditional-output-inline-login">Please login Inline</h5>
      )}
      <hr />
    </div>
  );
}
