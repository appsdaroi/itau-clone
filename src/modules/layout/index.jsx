import Link from "next/link";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen">
      {children}

      <nav className="fixed bottom-0 left-0 right-0 grid h-[4.5rem] grid-cols-5 gap-3 px-2 pt-2 pb-3 bg-white border-t">
        {router.pathname == "/" ? (
          <Link shallow href="/" className="flex justify-center items-top">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <i className="icon text-2xl before:content-['\e995'] text-white" />
            </div>
          </Link>
        ) : (
          <Link
            shallow
            href="/"
            className="flex flex-col items-center justify-start gap-1.5"
          >
            <i className="icon text-[1.5rem] before:content-['\e995'] text-primary leading-none" />
            <span className="text-xs">início</span>
          </Link>
        )}

        {router.pathname == "/balance" ? (
          <Link
            shallow
            href="/balance"
            className="flex justify-center items-top"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <i className="icon text-2xl before:content-['\ea87'] text-white" />
            </div>
          </Link>
        ) : (
          <Link
            shallow
            href="/balance"
            className="flex flex-col items-center justify-start gap-1.5"
          >
            <i className="icon text-[1.5rem] before:content-['\ea87'] text-primary leading-none" />
            <span className="text-xs">extrato</span>
          </Link>
        )}

        <button className="flex flex-col items-center justify-start gap-1.5">
          <i className="icon text-[1.5rem] before:content-['\e929'] text-primary leading-none" />
          <span className="text-xs">transações</span>
        </button>

        <button className="flex flex-col items-center justify-start gap-1.5">
          <i className="icon text-[1.5rem] before:content-['\e98f'] text-primary leading-none" />
          <span className="text-xs">produtos</span>
        </button>

        <button className="flex flex-col items-center justify-start gap-1.5">
          <i className="icon text-[1.5rem] before:content-['\ea7c'] text-primary leading-none" />
          <span className="text-xs">ajuda</span>
        </button>
      </nav>
    </div>
  );
};

export { Layout };
