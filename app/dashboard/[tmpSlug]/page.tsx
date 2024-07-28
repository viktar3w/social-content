import { contentTemplates } from "@/consts/template";
import { notFound } from "next/navigation";
import TemplateDashboardForm from "@/components/forms/TemplateDashboardForm";

type PageProps = {
  params: {
    tmpSlug: string;
  };
};
const Page = ({ params }: PageProps) => {
  const { tmpSlug } = params;
  const currentTemplate = contentTemplates.find(
    (tmp) => tmp.slug === tmpSlug.toLowerCase(),
  );
  if (!currentTemplate) {
    return notFound();
  }
  return (
    <div className="mx-5 py-2">
      <div className="mt-5 py-6 px-4 bg-white rounded">
        <h2 className="font-medium">{currentTemplate.name}</h2>
      </div>
      <TemplateDashboardForm
        forms={currentTemplate.form}
        aiPrompt={currentTemplate.aiPrompt}
        name={currentTemplate.name}
      />
    </div>
  );
};

export default Page;
