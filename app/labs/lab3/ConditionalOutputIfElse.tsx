export default function ConditionalOutputIfElse() {
  const loggedIn = true;

  if (loggedIn) {
    return <h4 id="wd-conditional-output-if-else-welcome">Welcome If Else</h4>;
  }

  return <h4 id="wd-conditional-output-if-else-login">Please login If Else</h4>;
}
