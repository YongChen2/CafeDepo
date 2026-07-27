export default function LoadingMenu() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 w-full flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <div className="h-3 w-40 bg-bg-alt" />
        <div className="h-10 w-64 bg-bg-alt" />
      </div>
      <div className="ascii-frame animate-pulse">
        <div className="p-4 bg-fg text-bg font-mono text-xs uppercase">
          Načítám jízdní řád…
        </div>
        <div className="hairline-grid grid-cols-1 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-bg p-3 flex flex-col gap-3">
              <div className="h-4 w-16 bg-bg-alt" />
              <div className="h-3 w-full bg-bg-alt" />
              <div className="h-3 w-4/5 bg-bg-alt" />
              <div className="h-3 w-full bg-bg-alt" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
