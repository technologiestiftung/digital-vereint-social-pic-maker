import { FC } from "react";
import EditorHeader from "./Header";
import HowItWorks from "./HowItWorks";
import EditorForm from "./EditorForm";
import { EditorProvider } from "./EditorContext";
import { CanvasPreview } from "./CanvasPreview";

const SocialImageEditor: FC = () => (
  <EditorProvider>
    <main className='grid' style={{ gridTemplateColumns: "1fr 400px" }}>
      <CanvasPreview />
      <aside className='h-screen shadow-2xl overflow-x-hidden overflow-y-auto'>
        <EditorHeader />
        <HowItWorks />
        <EditorForm />
      </aside>
    </main>
  </EditorProvider>
);

export default SocialImageEditor;
