import { signIn, signOut, useSession, getSession } from "next-auth/react";

export default function Home({ session }) {
  return (
    // <>
    //   <p>Signed in as </p>
    //   <button onClick={() => signOut()}>Sign out</button>
    // </>

    <div className="flex flex-col overflow-hidden">
      <nav className="fixed z-50 flex justify-between w-full px-4 pt-4 bg-primary">
        <div className="relative pt-3 pb-3.5 ml-2 text-white after:h-1 font-body text-[0.95rem] tracking-wide after:bg-white after:left-0 after:right-0 after:absolute after:bottom-0 after:rounded-full">
          meu extrato
        </div>

        <div className="flex items-center gap-3 mb-auto text-white">
          <div className="flex items-center gap-2 text-white text-[0.95rem] tracking-wide border-2 border-orange-900/10 py-0.5 px-2.5 rounded-xl">
            minhas finanças
            <i className="icon text-[1.2rem] before:content-['\ea2c']" />
          </div>

          <i className="icon text-2xl before:content-['\e92f']" />
        </div>
      </nav>

      <div className="h-full mt-20 overflow-y-scroll">
        <div className="flex flex-col px-6">
          <div className="flex items-center gap-2 bg-white">
            <div className="rounded-full w-7 h-7 bg-primary"></div>

            <div className="grid">
              <span className="text-xs text-black/50">Itaú Unibanco</span>

              <div className="flex items-center gap-1 -mt-0.5">
                <span className="text-[0.6rem] mt-[0.3rem] font-semibold">
                  R$
                </span>
                <span className="text-sm font-semibold">0,00</span>

                <i className="icon mt-0.5 text-sm text-green-700 before:content-['\e9cc']" />
              </div>
            </div>

            <div className="flex items-center gap-1 pl-2 pr-1 ml-auto border-2 rounded-full h-7 border-orange-900/10">
              <span className="-mt-1 text-sm font-semibold text-primary">
                ver outras contas
              </span>
              <i className="icon text-xl leading-[0] text-primary before:content-['\e9cc']" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <i className="icon text-[1.2rem] before:content-['\e927']" />

            <span className="text-xs">saldo sempre atualizado</span>
          </div>
        </div>

        <div className="flex gap-2 px-1 pt-4">
          <div className="flex items-center gap-2 px-3 py-1 text-sm font-semibold border-2 rounded text-black/70">
            filtros
            <span className="w-5 h-5 text-center text-white bg-[#126bab] relative rounded-full after:content-['6'] after:text-xs after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[49%] after:-translate-y-1/2"></span>
          </div>

          <div className="flex items-center gap-2 px-3 pt-1 pb-1.5 text-sm font-semibold border-2 rounded text-black/70">
            exportar
            <i className="icon text-primary before:content-['\e983'] h-4" />
          </div>
        </div>

        <div className="flex"></div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: { destination: "/auth/signin" },
    };

  return {
    props: {
      session: session,
    },
  };
}
