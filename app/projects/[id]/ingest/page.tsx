import { useParams } from 'next/navigation'

export default function ProjectIngestPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5 text-text-primary">Ingest Data for Project: {id}</h1>
      {/* Add ingestion form and logic here */}
    </div>
  );
}