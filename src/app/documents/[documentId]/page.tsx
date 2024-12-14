import { Editor } from "./_components/editor";
import { Navbar } from "./_components/navbar";
import { Toolbar } from "./_components/toolbar";
import { Room } from "./room";

interface DocumentPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentId } = await params;

  return (
    <Room>
      <div className="min-h-screen bg-[#F6F6F6]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 print:hidden">
          <Navbar />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor />
        </div>
      </div>
    </Room>
  );
};

export default DocumentPage;
