/**
 * الخلفية موجودة لخدمة الزجاج: أسطح `.glass` لا تُظهر أثرها إلا فوق شيء
 * متفاوت. لذا هالات لونية خافتة جدّاً (لا تكسر الأحادية الداكنة) تتحرّك ببطء،
 * وفوقها حُبيبات فيلمية تمنع تحزّم التدرّجات.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg-900">
      {/* ضوء علوي محايد — مصدر الإضاءة الأساسي للمشهد */}
      <div className="absolute left-1/2 top-[-32%] h-[760px] w-[min(1280px,130vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10),rgba(255,255,255,0.03)_38%,transparent_72%)] blur-[40px]" />

      {/* هالتان لونيّتان بخفوت شديد: بلا لون خلفها يبدو الزجاج رماديّاً ميّتاً */}
      <div className="animate-float absolute left-[-12%] top-[18%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.16),transparent_68%)] blur-[110px]" />
      <div
        className="animate-float absolute bottom-[-18%] right-[-10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.10),transparent_68%)] blur-[120px]"
        style={{ animationDelay: "2.5s" }}
      />
      <div className="absolute bottom-[6%] left-[38%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.08),transparent_70%)] blur-[120px]" />

      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_0%,transparent_42%,#050505_100%)]" />
    </div>
  );
}
