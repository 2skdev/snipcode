import Header from "@/components/header";
import Footer from "@/components/footer";

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

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Default;
