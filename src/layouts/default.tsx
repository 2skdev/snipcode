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

      <main className="bg-gray-200">
        <div className="container md:max-w-screen-md mx-auto">{children}</div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Default;
