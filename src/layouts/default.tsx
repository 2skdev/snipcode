type Props = {
  children: React.ReactNode;
};

const Default = ({ children }: Props): JSX.Element => {
  return (
    <>
      <main className="p-2">{children}</main>
    </>
  );
};

export default Default;
