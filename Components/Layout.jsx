import Head from "next/head";
import Link from "next/link";

const Layout = ({ children, title }) => {
  return (
    <div className="w-full min-h-screen bg-very_dark_blue">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Countries API using Next.JS"></meta>
      </Head>
      <nav className="w-full bg-dark_blue shadow-lg py-4 ">
        <div className="container lg:text-lg text-base mx-auto lg:px-0 px-10 flex justify-between text-custom_white ">
          <h1 className="font-bold">
            <Link href="/">
              <a>Where in the world?</a>
            </Link>
          </h1>
        </div>
      </nav>

      <main className="container lg:px-0 px-10 mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
