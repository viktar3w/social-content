import UpgradeCard from "@/components/cards/UpgradeCard";

const Page = () => {
  return (
    <div className="mx-5 py-2">
      <div className="mt-5 py-6 px-4 bg-white rounded">
        <h2 className="font-medium">Upgrade Credit</h2>
      </div>
      <div className="mt-5 py-6 px-4 rounded">
        <UpgradeCard />
      </div>
    </div>
  );
};

export default Page;
