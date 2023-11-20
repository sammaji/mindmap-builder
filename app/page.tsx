import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <a href="/editor">
        <Button>Go to editor</Button>
      </a>
    </div>
  );
}
