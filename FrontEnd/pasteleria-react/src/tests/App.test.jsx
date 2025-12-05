import { render } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

test("App se renderiza sin errores", () => {
  render(
      <App />
  );
});