import fs from "node:fs";

export default function ServerComponentDemo() {
  const processInfo = {
    platform: process.platform,
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage(),
    cwd: process.cwd(),
  };

  const serverRenderTime = new Date().toLocaleTimeString();
  const projectRoot = process.cwd();
  let files: string[] = [];

  try {
    files = fs.readdirSync(projectRoot);
  } catch (error) {
    console.error("Error reading project directory:", error);
    files = [];
  }

  return (
    <div id="wd-server-component-demo">
      <h4>Server Component Demo</h4>
      <h5>Server Render Time</h5>
      <p>Rendered on server at: {serverRenderTime}</p>
      <h5>Server Information</h5>
      <pre>{JSON.stringify(processInfo, null, 2)}</pre>
      <h5>Filesystem Access Demo</h5>
      <pre>{JSON.stringify(files, null, 2)}</pre>
      <hr />
    </div>
  );
}
