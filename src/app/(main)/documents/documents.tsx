async function getDocuments() {
  return [] as { id: string; title: string }[];
}
export default async function DocumentsPage() {
  const documents = await getDocuments();
  return (
    <div>
      {documents.length ? (
        documents.map(({ id, title }) => <div key={id}>{title}</div>)
      ) : (
        <p>No documents uploaded</p>
      )}
    </div>
  );
}
