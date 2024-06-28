import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  return (
    <div className="flex items-center space-x-2">
      <Input type="text" className="px-3 py-2 w-80 bg-gray-900 bg-blend-lighten placeholder-gray-300 border-none focus: border-gray-600" placeholder="Search..." />
      <Button className="px-3 py-2">Search</Button>
    </div>
  )
}