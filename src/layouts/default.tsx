import Header from "@/components/header";

type Props = {
  children: React.ReactNode;
};

const Default = ({ children }: Props): JSX.Element => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="bg-gray-200">{children}</main>
    </>
  );
};

export default Default;
