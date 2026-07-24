import Image from "next/image";

export default function Hero({ className, img, children }: { className: string; img: string; children: React.ReactNode; }) {
  return (
    <section className={`relative flex justify-center ${className}`}>
      <Image src={`/${img.toLowerCase()}.jpg`} alt={img} fill sizes="100%" className="object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground-dark/70 via-foreground-dark/40 to-foreground-dark/70"></div>
      <div className="relative text-center m-20">
        {children}
      </div>
    </section>
  );
}