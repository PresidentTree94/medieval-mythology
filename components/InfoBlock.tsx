export default function InfoBlock({ isDark }: { isDark?: boolean }) {
  return (
    <div className={`p-6 space-y-2 ${isDark ? "relative" : ""}`}>
      <p className={`text-xs tracking-widest uppercase font-display ${isDark ? "text-[oklch(0.84_0.115_84)]" : "text-[oklch(0.50_0.120_76)]"}`}>Subtitle</p>
      <h3 className={`text-xl ${isDark ? "text-card" : "text-foreground-dark"}`}>Title</h3>
      <span className={`text-sm italic inline-block ${isDark ? "text-background-light" : "text-foreground-light"}`}>Tagline</span>
      <p className={`mt-1 text-sm ${isDark ? "text-background-light/90" : "text-foreground-light"}`}>Description</p>
    </div>
  );
}