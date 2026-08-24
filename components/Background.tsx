/** الخلفية "الفضائية": شفق متدرّج متحرّك + شبكة + تظليل حوافّ. ثابتة خلف كل شيء. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* شبكة خافتة */}
      <div className="absolute inset-0 bg-grid-line [background-size:56px_56px] opacity-[0.5]" />

      {/* بقع الشفق */}
      <div className="absolute -top-40 -left-32 h-[42rem] w-[42rem] rounded-full bg-violet/30 blur-[130px] animate-aurora" />
      <div className="absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-cyan/20 blur-[130px] animate-aurora-slow" />
      <div className="absolute bottom-0 left-1/4 h-[34rem] w-[34rem] rounded-full bg-pink/10 blur-[140px] animate-aurora" />

      {/* تظليل الحواف ليركّز العين على المنتصف */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_45%,#08090d_100%)]" />
    </div>
  );
}
