import { Editor } from "./_components/editor";
import { Toolbar } from "./_components/toolbar";

interface DocumentPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentPage;
