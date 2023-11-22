import { Editor } from "@/components/mindmap-editor/editor";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Page() {
  return (
    <div>
      <Navbar />
      <Separator orientation="horizontal" />
      <div className="w-screen h-[calc(100dvh-50px)]">
        <Editor />
      </div>
    </div>
  );
}
