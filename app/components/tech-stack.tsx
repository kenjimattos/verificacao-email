import { Badge } from './ui/badge';

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
        <Badge key={tech.name} href={tech.url}>
          {tech.name}
        </Badge>
      ))}
    </div>
  );
}