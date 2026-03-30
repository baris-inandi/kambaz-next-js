"use client";

import { useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");

  const fetchWelcomeOnClick = async () => {
    const response = await client.fetchWelcome();
    setWelcomeOnClick(response);
  };

  return (
    <div id="wd-http-client">
      <h3>HTTP Client</h3>
      <hr />
      <h4>Requesting on Click</h4>
      <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
        Fetch Welcome
      </button>
      <br />
      Response from server: <b>{welcomeOnClick}</b>
      <hr />
    </div>
  );
}
