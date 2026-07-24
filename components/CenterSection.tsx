import Decor from "./Decor";

export default function CenterSection({ tiny, title, icon, text, children }: {
  tiny: string;
  title: string;
  icon: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-background-dark">
      <div>
        <div className="max-w-3xl mx-auto text-center topper">
          <span>{tiny}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl">{title}</h2>
          <Decor className="my-6 w-48" icon={icon} />
          <p>{text}</p>
        </div>
        {children}
      </div>
    </section>
  );
}