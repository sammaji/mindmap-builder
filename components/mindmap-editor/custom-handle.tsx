import { Handle, Position } from "reactflow";
import "./index.css";

export function HandleGroup() {
  return (
    <>
      <Handle type="source" id="handle1" position={Position.Top} />
      <Handle type="source" id="handle2" position={Position.Left} />
      <Handle type="source" id="handle3" position={Position.Right} />
      <Handle type="source" id="handle4" position={Position.Bottom} />
    </>
  );
}
