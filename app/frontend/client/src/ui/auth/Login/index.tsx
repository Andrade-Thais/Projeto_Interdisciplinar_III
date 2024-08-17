import { TokenProvider } from "../../../contexts/auth/TokenContext";
import Login from "./Login";

export default function Auth() {
  return (
    <TokenProvider>
      <Login />
    </TokenProvider>
  );
}
