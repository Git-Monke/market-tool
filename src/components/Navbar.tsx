import { Separator } from "./ui/separator";

export default function Navbar() {
  return (
    <nav className="py-4 px-8 shadow-md">
      <div className="w-full h-10 flex justify-between items-center ">
        <div className="flex gap-4 h-full items-center">
          <p>MarketTool</p>
          <Separator orientation="vertical" className="h-full"></Separator>
          <a href="http://localhost:3000/items">Items</a>
          <a>Inventory</a>
          <a>Markets</a>
          <a>Insights</a>
        </div>
      </div>
    </nav>
  );
}
