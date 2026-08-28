/**
 * الخلفية: أسود دافئ + هالة علوية واحدة + حُبيبات فيلمية.
 * لا شبكة ولا ألوان — العمق يأتي من التدرّج والضوء وحدهما.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg-900">
      <div className="absolute left-1/2 top-[-30%] h-[720px] w-[min(1200px,120vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.09),rgba(255,255,255,0.03)_38%,transparent_70%)] blur-[40px]" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[520px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.045),transparent_70%)] blur-[90px]" />
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_0%,transparent_45%,#050505_100%)]" />
    </div>
  );
}
