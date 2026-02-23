import * as Math from "./Math";
import * as Matematica from "./Math";
import { add, divide, multiply, subtract } from "./Math";

export default function DestructingImports() {
  return (
    <div id="wd-destructing-imports">
      <h4>Destructing Imports</h4>
      <table>
        <tbody>
          <tr>
            <td>Math.add(2, 3) = {Math.add(2, 3)}</td>
            <td>Matematica.add(2, 3) = {Matematica.add(2, 3)}</td>
            <td>add(2, 3) = {add(2, 3)}</td>
          </tr>
          <tr>
            <td>Math.subtract(5, 1) = {Math.subtract(5, 1)}</td>
            <td>Matematica.subtract(5, 1) = {Matematica.subtract(5, 1)}</td>
            <td>subtract(5, 1) = {subtract(5, 1)}</td>
          </tr>
          <tr>
            <td>Math.multiply(2, 3) = {Math.multiply(2, 3)}</td>
            <td>Matematica.multiply(2, 3) = {Matematica.multiply(2, 3)}</td>
            <td>multiply(2, 3) = {multiply(2, 3)}</td>
          </tr>
          <tr>
            <td>Math.divide(9, 3) = {Math.divide(9, 3)}</td>
            <td>Matematica.divide(9, 3) = {Matematica.divide(9, 3)}</td>
            <td>divide(9, 3) = {divide(9, 3)}</td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  );
}
