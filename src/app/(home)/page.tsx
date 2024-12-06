import { Navbar } from "./_components/navbar";
import { TemplateGallery } from "./_components/template-gallery";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
      </div>
    </div>
  );
}
