import Provider from "@/app/components/provider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
