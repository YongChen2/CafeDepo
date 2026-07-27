export function Ticker({ text }: { text: string }) {
  return (
    <div className="border-y border-fg bg-fg text-bg overflow-hidden py-2">
      <div className="ticker-track">
        <span className="font-mono uppercase text-xs sm:text-sm tracking-widest whitespace-nowrap pr-8">
          {text}
        </span>
        <span
          className="font-mono uppercase text-xs sm:text-sm tracking-widest whitespace-nowrap pr-8"
          aria-hidden="true"
        >
          {text}
        </span>
      </div>
    </div>
  );
}
