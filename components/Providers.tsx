import { FC } from "react";
import { EditorProvider } from "./editor/EditorContext";

const Providers: FC = ({ children }) => (
  <EditorProvider>{children}</EditorProvider>
);

export default Providers;
