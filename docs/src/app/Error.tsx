import Header from "@/design/layout/LayoutElements/Header";

export default function Error() {
  return (
    <>
      <Header>
        <h1 className="font-display py-2 text-5xl font-medium">Error 404</h1>
      </Header>
      <div className="container m-auto my-16 max-w-7xl px-4">
        <h1 className="font-display text-5xl font-medium">Where am I?</h1>
        <p className="text-medium text-lg">The page you're trying to reach cannot be found.</p>
      </div>
    </>
  );
}
