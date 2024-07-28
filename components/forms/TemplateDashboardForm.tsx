"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { ContentTemplate } from "@/consts/template";
import TemplateEditor from "@/components/editors/TemplateEditor";
import useAiGeneration, {
  SendMediaContentProps,
} from "@/hooks/useAiGeneration";
import { useState } from "react";

type TemplateDashboardFormProps = {
  forms: ContentTemplate["form"];
  aiPrompt: ContentTemplate["aiPrompt"];
  name: ContentTemplate["name"];
};

const TemplateDashboardForm = ({
  forms,
  aiPrompt,
  name,
}: TemplateDashboardFormProps) => {
  const [input, setInput] = useState<SendMediaContentProps>({
    title: "",
    description: "",
    templateUsed: name,
  });
  const { aiOutput, onSubmit, isLoading } = useAiGeneration({
    aiPrompt,
  });
  return (
    <form>
      <div className="flex flex-col gap-4 p-5 mt-5 bg-white">
        {forms.map((form) => (
          <div className="" key={form.id}>
            <label htmlFor={form.id}>{form.label}</label>
            <div className="mt-5">
              {form.field === "input" && (
                <Input
                  minLength={5}
                  maxLength={255}
                  value={input.title}
                  disabled={isLoading}
                  onChange={(e) =>
                    setInput((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              )}
              {form.field === "textarea" && (
                <Textarea
                  minLength={10}
                  maxLength={1000}
                  disabled={isLoading}
                  onChange={(e) =>
                    setInput((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        disabled={isLoading}
        className="mt-5"
        onClick={(e) => {
          e.preventDefault();
          if (
            !input.title ||
            !input.description ||
            input.title.length < 5 ||
            input.title.length > 255 ||
            input.description.length < 10 ||
            input.description.length > 1000
          ) {
            return;
          }
          onSubmit(input);
        }}
      >
        {isLoading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          "Generate Content"
        )}
      </Button>
      <div className="my-10">
        <TemplateEditor value={isLoading ? "Generating..." : aiOutput} />
      </div>
    </form>
  );
};

export default TemplateDashboardForm;
