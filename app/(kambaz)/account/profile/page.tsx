import Link from "next/link";
import { Button, FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormControl
        defaultValue="alice"
        placeholder="username"
        className="mb-2"
        id="wd-username"
      />
      <FormControl
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2"
        id="wd-password"
      />
      <FormControl
        defaultValue="Alice"
        placeholder="First Name"
        className="mb-2"
        id="wd-firstname"
      />
      <FormControl
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="mb-2"
        id="wd-lastname"
      />
      <FormControl
        defaultValue="2000-01-01"
        type="date"
        className="mb-2"
        id="wd-dob"
      />
      <FormControl
        defaultValue="alice@wonderland"
        type="email"
        className="mb-2"
        id="wd-email"
      />
      <FormSelect defaultValue="FACULTY" className="mb-2" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Button variant="danger" className="w-100 mb-2">
        Update
      </Button>
      <Link href="/account/signin">Sign out</Link>
    </div>
  );
}
