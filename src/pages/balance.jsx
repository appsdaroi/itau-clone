import { getSession, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

import { CentsToReais } from "@/helpers/format";

import { isIOS } from "react-device-detect";

import _ from "lodash";
import { FetchWithToken } from "@/utils/fetch";

import moment from "moment";

import "moment/locale/pt-br";

export default function Balance({ session }) {
  const { data } = useSession();
  session = data;

  const [extracts, setExtracts] = useState([]);
  const [topHeight, setTopHeight] = useState(0);

  const [balance, setBalance] = useState(
    CentsToReais(session.session.user.balance)
  );

  const updateUserBalance = async () => {
    const { data } = await FetchWithToken({
      path: `itau/${session.session.user.id}`,
      method: "GET",
    });

    setBalance(CentsToReais(data.response.balance));
  };

  const getExtracts = async () => {
    const { data } = await FetchWithToken({
      path: `itau/${session.session.user.id}/extracts`,
      method: "GET",
    });

    const formattedDates = data.response.map((extract, i) => {
      return {
        ...extract,
        date: moment(extract.date).format("DD/MM/YYYY"),
      };
    });

    const grouped = _.mapValues(_.groupBy(formattedDates, "date"));

    const ordered = Object.keys(grouped)
      .sort()
      .reduce((obj, key) => {
        obj[key] = grouped[key];
        return obj;
      }, {});

    Object.keys(ordered).map((date, i) => {
      ordered[date].totalValue = 0;

      ordered[date].map((extract, i) => {
        if (extract.type === "withdraw")
          return (ordered[date].totalValue =
            ordered[date].totalValue - extract.value);

        ordered[date].totalValue += extract.value;
      });
    });

    setExtracts(ordered);
  };

  const topRef = useRef(null);
  moment.locale("pt-br");

  useEffect(() => {
    setTopHeight(topRef.current.clientHeight);

    document.addEventListener("visibilitychange", () => {
      !document.hidden && updateUserBalance();
      !document.hidden && getExtracts();
    });

    getExtracts();
  }, []);

  return (
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

      <div className="flex flex-col h-full mt-20 overflow-y-hidden">
        <div className="flex flex-col pb-2" ref={topRef}>
          <div className="flex flex-col px-6">
            <div className="flex items-center gap-2 bg-white">
              <div
                className="rounded-full w-7 h-7 !bg-[url('/itau.svg')] bg-center bg-primary bg-no-repeat"
                style={{ backgroundSize: "50%" }}
              ></div>

              <div className="grid">
                <span className="text-xs text-black/50">Itaú Unibanco</span>

                <div className="flex items-center gap-1">
                  <span className="text-[0.6rem] font-semibold">R$</span>
                  <span className="text-sm font-semibold leading-1">
                    {balance.slice(3)}
                  </span>

                  <i className="icon text-sm text-green-700 before:content-['\e9cc'] leading-[1rem] h-full" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-1 pt-1.5 pb-1 pl-2 pr-1 ml-auto border-2 rounded-full border-orange-900/10">
                <span className="text-sm font-semibold h-[16px] leading-[16px] text-primary">
                  ver outras contas
                </span>
                <i className="icon text-xl leading-[0] text-primary before:content-['\e9cc']" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <i className="icon text-[1.2rem] before:content-['\e927']" />

              {isIOS ? (
                <span className="h-2 text-xs">saldo sempre atualizado</span>
              ) : (
                <span className="text-xs">saldo sempre atualizado</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 px-1 pt-4">
            {isIOS ? (
              <div className="flex items-center gap-2 px-3 pt-1.5 pb-2 text-sm font-semibold border-2 rounded text-black/70 leading-4">
                <span className="h-3">filtros</span>
                <span className="h-5 w-5 text-center text-white bg-[#126bab] relative rounded-full text-xs flex items-center justify-center leading-3">
                  <span className="mt-1">6</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 pt-1.5 pb-2 text-sm font-semibold border-2 rounded text-black/70">
                filtros
                <span className="w-5 h-5 text-center text-white bg-[#126bab] relative rounded-full after:content-['6'] after:text-xs after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[49%] after:-translate-y-1/2"></span>
              </div>
            )}

            {isIOS ? (
              <div className="flex items-center gap-2 px-3 pt-1.5 pb-2 text-sm font-semibold border-2 rounded text-black/70">
                <span className="h-4">exportar</span>
                <i className="icon text-primary before:content-['\e983'] h-full" />
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 pt-1.5 pb-2 text-sm font-semibold border-2 rounded text-black/70">
                exportar
                <i className="icon text-primary before:content-['\e983'] h-full" />
              </div>
            )}
          </div>
        </div>

        <div
          className="flex flex-col overflow-y-scroll bg-[#f9f8f6] p-1 pb-24"
          style={{ height: `calc(100vh - ${topHeight}px)` }}
        >
          {_.reverse(Object.keys(extracts)).map((date, i) => (
            <div key={date}>
              {console.log(date)}
              <div className="grid grid-rows-2 gap-1 p-3">
                <span className="font-semibold">
                  {moment(date, "DD/MM/YYYY").format("DD [de] MMMM")}
                </span>
                <div className="flex gap-1 text-sm opacity-80">
                  <span>saldo do dia</span>
                  <span className="font-semibold">
                    {extracts[date].totalValue < 0
                      ? CentsToReais(0)
                      : CentsToReais(extracts[date].totalValue)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {extracts[date].map((extract, i) => {
                  if (extract.type === "withdraw")
                    return (
                      <div
                        key={`${extract.type}__${extract.date}__${i}`}
                        className="flex items-end w-full gap-3.5 py-2 px-3.5 h-16 bg-white rounded shadow"
                      >
                        <i className="icon text-2xl before:content-['\e9bb'] text-primary" />

                        <div className="grid grid-rows-2">
                          <span className="text-[0.7rem] text-black/70">
                            outras transferências
                          </span>
                          <span className="font-semibold">
                            pix transf {extract.title}{" "}
                            {moment(date, "DD/MM").format("DD/MM")}
                          </span>
                        </div>

                        <span className="ml-auto font-semibold whitespace-nowrap">
                          - {CentsToReais(extract.value)}
                        </span>
                      </div>
                    );

                  return (
                    <div
                      key={`${extract.type}__${extract.date}__${i}`}
                      className="flex items-end w-full gap-3.5 py-2 px-3.5 h-16 bg-white rounded shadow"
                    >
                      <i className="icon text-2xl before:content-['\e9bb'] text-green-700" />

                      <div className="grid grid-rows-2">
                        <span className="text-[0.7rem] text-black/70">
                          outras transferências
                        </span>
                        <span className="font-semibold text-green-700 extract-title">
                          pix transf {extract.title}{" "}
                          {moment(date, "DD/MM").format("DD/MM")}
                        </span>
                      </div>

                      <span className="ml-auto font-semibold text-green-700 whitespace-nowrap">
                        {CentsToReais(extract.value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
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
    props: { session },
  };
}
