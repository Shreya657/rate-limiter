import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function KeySelector({ onSelect, apiKeys }: { onSelect: (val: string | null) => void, apiKeys: any[] }) {
  return (
    <Select onValueChange={(value) => onSelect(value === "all" ? null : value)}>
      <SelectTrigger className="w-[200px] text-white bg-zinc-900 border-zinc-800 shadow-md">
        <SelectValue placeholder="All API Keys" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All API Keys</SelectItem>
        {apiKeys.map((key) => (
          <SelectItem key={key.id} value={key.id}>
            {key.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}