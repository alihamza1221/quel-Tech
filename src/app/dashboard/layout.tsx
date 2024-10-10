import CreateTaskFormSheet from "./components/formSheet";
import { NeoMenuBar } from "@/components/components-neo-menu-bar";
const DashBoardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <NeoMenuBar />
      {children}
    </div>
  );
};

export default DashBoardLayout;
