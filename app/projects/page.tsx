import Link from 'next/link'

export default function ProjectsPage() {
  // Dummy data for demonstration
  const projects = [
    { id: '1', name: 'Project Alpha' },
    { id: '2', name: 'Project Beta' },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5 text-text-primary">Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-2">
            <Link href={`/projects/${project.id}/chat`} className="text-blue-500 hover:underline">
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}