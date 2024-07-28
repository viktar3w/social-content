"use client";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import dynamic from "next/dynamic";
type TemplateEditorProps = {
  value: string;
};
const TemplateEditor = ({ value }: TemplateEditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  return (
    <ReactQuill
      theme="snow"
      value={value}
      className="h-[350px] pb-10 bg-white whitespace-break-spaces"
    ></ReactQuill>
  );
};

export default TemplateEditor;
