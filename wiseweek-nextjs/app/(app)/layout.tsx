import Spine from "@/components/layout/Spine";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Spine />
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
