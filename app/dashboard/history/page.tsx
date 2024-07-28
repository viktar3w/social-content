import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserAiOutputs } from "@/actions/send-ai-request";

const Page = async () => {
  const userHistories = await getUserAiOutputs();
  return (
    <div className="mx-5 py-2">
      <div className="mt-5 py-6 px-4 bg-white rounded">
        <h2 className="font-medium">Output history</h2>
      </div>
      <div className="mt-5 py-6 px-4 bg-white rounded">
        <Table>
          <TableCaption>A list of your ai output history</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Template</TableHead>
              <TableHead className="w-[250px]">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userHistories.map((history) => (
              <TableRow key={history.id}>
                <TableCell>{history.templateUsed}</TableCell>
                <TableCell className="w-[250px]">{history.title}</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {history.description}
                </TableCell>
                <TableCell className="text-right">
                  {history.createdAt.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
