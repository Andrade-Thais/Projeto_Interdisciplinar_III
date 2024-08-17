import { createContext } from "react";

const DashboardContext = createContext({});

export default DashboardContext;

export const { Provider, Consumer } = DashboardContext;
