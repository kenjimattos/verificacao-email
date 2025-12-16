import { LinkBadge } from "./ui/link-badge";

export function TechStack() {
  const techs = [
    { name: 'Next.js 16', url: 'https://nextjs.org' },
    { name: 'JWT', url: 'https://jwt.io' },
    { name: 'Resend', url: 'https://resend.com' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {techs.map((tech) => (
        <LinkBadge key={tech.name} href={tech.url}>
          {tech.name}
        </LinkBadge>
      ))}
    </div>
  );
}