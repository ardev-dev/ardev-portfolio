/** خلفية المنتج: شبكة تتلاشى من الأعلى + توهّجات نيلية/بنفسجية ذوقية. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_-2%,#000_55%,transparent_100%)]" />
      <div className="absolute left-1/2 top-[-18%] h-[560px] w-[min(1000px,95vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.30),rgba(167,139,250,0.12)_42%,transparent_72%)] blur-[30px]" />
      <div className="absolute bottom-[-12%] right-[-8%] h-[440px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.10),transparent_70%)] blur-[70px]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_55%,#08090c_100%)]" />
    </div>
  );
}
