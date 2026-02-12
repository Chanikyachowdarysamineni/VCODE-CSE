import { Button } from "./ui/moving-border";

export function MovingBorder({ name, isActive, onClick }: { name: string; isActive: boolean; onClick: () => void }) {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className={`dark:bg-slate-200 text-slate-200 dark:text-white border-neutral-200 dark:border-slate-200 
          ${isActive ? "bg-black text-white" : "text-gray-400 hover:text-white"} cursor-pointer`}
        onClick={onClick}
      >
        {name}
      </Button>
    </div>
  );
}


