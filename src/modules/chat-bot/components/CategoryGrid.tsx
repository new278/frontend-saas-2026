import { Button } from "@/src/components/ui/button";

const CHAT_CATEGORIES = [
  { name: "Construction" },
  { name: "Technical" },
  { name: "Visa" },
  { name: "Orders" },
  { name: "Export" },
  { name: "Travelling" },
  { name: "Hiring" },
  { name: "Payment" },
  { name: "Return" },
  { name: "Advice" },
  { name: "Others" },
];

export const CategoryGrid = ({
  onSelectCategory,
}: {
  onSelectCategory: (category: string) => void;
}) => {
  return (
    <div className="bg-base-100 px-6 py-5 flex flex-wrap gap-4">
      {CHAT_CATEGORIES.map((category, index) => (
        <div key={category.name} className={`col-span-1`}>
          <Button
            variant="outline"
            onClick={() => onSelectCategory(category.name)}
           className="text-[#151854]"
          >
            {category.name}
          </Button>
        </div>
      ))}
    </div>
  );
};
