import { signOut, getSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";

import { toDollars } from "@/helpers/format";

import _ from "lodash";
import axios from "axios";

export default function Home({ session }) {
  const [navHeight, setNavHeight] = useState(0);
  const [balanceIsVisible, setBalanceIsVisible] = useState(false);

  const [balance, setBalance] = useState(toDollars(session.user.balance).slice(3));

  const updateUserBalance = async () => {
    const config = {
      headers: {
        "X-Master-Key":
          "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
      },
    };

    const db = await axios.get(
      "https://api.jsonbin.io/v3/b/6424fcdcace6f33a2200454e",
      config
    );

    const dbUser = _.find(
      db.data.record.users,
      (user) => user.id === session.user.id
    );

    setBalance(toDollars(dbUser.balance).slice(3));
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      !document.hidden && updateUserBalance();
    });
  }, []);

  const navRef = useRef(null);

  useEffect(() => {
    setNavHeight(navRef.current.clientHeight);
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">
      <div
        className="fixed z-50 flex justify-between w-full px-4 py-3 bg-primary"
        ref={navRef}
      >
        <div
          className="flex items-center gap-2.5 text-white"
          onClick={() => signOut()}
        >
          <div className="relative w-8 h-8 border-2 rounded-full border-neutral-200 bg-neutral-100">
            <i className="icon text-neutral-200 leading-none text-lg text-center absolute before:content-['\ea69'] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm font-bold capitalize font-body">
              {session.user.username}
            </span>
            <i className="icon before:content-['\e9cc']" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-white">
          <i className="icon text-2xl before:content-['\e91a']" />
          <i className="icon text-2xl before:content-['\e97b']" />
        </div>
      </div>

      <div
        className="h-full overflow-y-scroll"
        style={{ marginTop: navHeight }}
      >
        <div className="grid gap-5 px-6 pt-2 bg-primary">
          <button
            onClick={() => setBalanceIsVisible(!balanceIsVisible)}
            className="flex flex-row items-center gap-2 text-white"
          >
            {balanceIsVisible ? (
              <i className="icon text-2xl before:content-['\ea8c']" />
            ) : (
              <i className="icon text-2xl before:content-['\ea8d']" />
            )}
            <span className="mt-px text-sm font-bold font-body">
              saldo em conta
            </span>
          </button>

          <div className="flex flex-row items-center gap-2 text-white">
            <span className="text-2xl font-bold h-fit font-display">R$</span>
            {balanceIsVisible ? (
              <div className="text-2xl font-bold tracking-wide h-fit font-display">
                {balance}
              </div>
            ) : (
              <div className="-mt-1 text-3xl">• • • •</div>
            )}
            {balanceIsVisible && (
              <i className="icon text-2xl before:content-['\e992'] ml-auto" />
            )}
          </div>

          <hr className="h-px opacity-50" />

          <div className="flex flex-row items-center gap-1 pb-5 text-white">
            <span className="text-sm font-bold font-body">
              limite da conta disponível
            </span>
            <span className="text-sm font-bold font-display">R$</span>
            {balanceIsVisible ? (
              <div className="text-sm font-bold font-display">
                {session.user.limit}
              </div>
            ) : (
              <div className="text-sm tracking-wide">• • • •</div>
            )}

            <i className="icon ml-auto text-sm before:content-['\e9cd']" />
          </div>
        </div>

        <div className="flex gap-[0.15rem] overflow-x-auto pb-4 border-b-2 border-b-black/10">
          <div className="inline-flex flex-col items-center justify-center pt-2 px-2.5 gap-2 flex-[0]">
            <div className="relative w-11 h-11 rounded-xl bg-[#106daf] flex items-center justify-center">
              <img
                src="/open_finance.svg"
                height="auto"
                width="16px"
                className="object-contain mt-px"
              />
            </div>
            <span className="text-xs text-center whitespace-nowrap">
              open finance
            </span>
          </div>

          <div className="inline-flex flex-col items-center justify-center pt-2 px-2.5 gap-2 flex-[0]">
            <div className="relative flex items-center justify-center bg-white border w-11 h-11 border-black/5 rounded-xl">
              <img
                src="/pix.svg"
                height="auto"
                width="16px"
                className="object-contain mt-px"
              />
            </div>
            <span className="text-xs text-center whitespace-nowrap">Pix</span>
          </div>

          <div className="inline-flex flex-col items-center justify-center pt-2 px-2.5 gap-2 flex-[0]">
            <div className="relative bg-white border w-11 h-11 border-black/5 rounded-xl">
              <i className="icon text-primary leading-none text-2xl text-center absolute before:content-['\e97e'] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
            </div>
            <span className="text-xs text-center whitespace-nowrap">
              pagar conta
            </span>
          </div>

          <div className="inline-flex flex-col items-center justify-center pt-2 px-2.5 gap-2 flex-[0]">
            <div className="relative mt-4 bg-white border w-11 h-11 border-black/5 rounded-xl">
              <i className="icon text-primary leading-none text-2xl text-center absolute before:content-['\e9bb'] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
            </div>
            <span className="text-xs text-center">fazer transferências</span>
          </div>

          <div className="inline-flex flex-col items-center justify-center pt-2 px-2.5 gap-2 flex-[0]">
            <div className="relative mt-4 bg-white border w-11 h-11 border-black/5 rounded-xl">
              <i className="icon text-[#106daf] leading-none text-2xl text-center absolute before:content-['\e973'] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
            </div>
            <span className="text-xs text-center">personalizar atalhos</span>
          </div>
        </div>

        <div className="flex flex-col gap-10 bg-[#eee9e5] pb-16">
          <div className="flex flex-col mt-5">
            <div className="flex flex-col w-full gap-4 px-5 pt-5 pb-3 max-w-[92%] mx-auto bg-white border-t-8 rounded-t border-t-primary">
              <div className="flex items-center justify-between">
                <span className="text-[0.95rem] font-bold">
                  Itau Visa Click
                </span>
                <div className="flex items-center gap-2 mr-4">
                  <span className="text-xs text-neutral-600">expandir</span>

                  <i className="icon text-xs text-primary before:content-['\e9cc']" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="/visa.svg"
                  height="auto"
                  width="32px"
                  className="object-contain mt-px"
                />
                <span className="text-sm text-neutral-600">final 9064</span>
              </div>

              <hr className="mt-4 border-neutral-300" />

              <div className="flex gap-6">
                <span className="text-[#106daf] font-bold">ver fatura</span>
                <span className="text-[#106daf] font-bold">cartão virtual</span>
              </div>
            </div>

            <div className="flex gap-2 w-full max-w-[92%] mx-auto bg-primary rounded-b py-3 pl-8 pr-4 items-center">
              <span className="text-sm text-white">
                Proteção para o seu cartão por apenas R$7,90/mês
              </span>
              <span className="h-min px-4 pb-1.5 pt-1 text-sm text-white border border-white rounded whitespace-nowrap">
                Eu quero
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 p-5 max-w-[92%] mx-auto bg-white rounded shadow">
            <div className="flex justify-between p-1 items-top">
              <span className="text-2xl font-light leading-1 font-display">
                organize
                <br />
                suas finanças
              </span>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-neutral-600">expandir</span>

                <i className="icon text-xs text-primary before:content-['\e9cc']" />
              </div>
            </div>

            <hr className="border-neutral-300" />

            <div className="flex gap-6">
              <span className="text-[#106daf] font-bold">ver contratos</span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 p-5 max-w-[92%] mx-auto bg-white rounded shadow">
            <div className="flex justify-between p-1 items-top">
              <span className="text-2xl font-light leading-1 font-display">
                crédito
              </span>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-neutral-600">expandir</span>

                <i className="icon text-xs text-primary before:content-['\e9cc']" />
              </div>
            </div>

            <hr className="border-neutral-300" />

            <div className="flex gap-6">
              <span className="text-[#106daf] font-bold">ver mais</span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 px-5 pt-5 pb-4 max-w-[92%] mx-auto bg-white rounded shadow">
            <div className="flex justify-between p-1 items-top">
              <span className="text-2xl font-light leading-1 font-display">
                meus
                <br />
                investimentos
              </span>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-neutral-600">expandir</span>

                <i className="icon text-xs text-primary before:content-['\e9cc']" />
              </div>
            </div>

            <hr className="border-neutral-300" />

            <div className="flex gap-6">
              <span className="text-[#106daf] font-bold">ver detalhes</span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 p-5 max-w-[92%] mx-auto bg-white rounded shadow">
            <div className="flex justify-between p-1 items-top">
              <span className="text-2xl font-light leading-1 font-display">
                seguros
              </span>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-neutral-600">expandir</span>

                <i className="icon text-xs text-primary before:content-['\e9cc']" />
              </div>
            </div>

            <hr className="border-neutral-300" />

            <div className="flex gap-6">
              <span className="text-[#106daf] font-bold">ver mais</span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 p-5 max-w-[92%] mx-auto bg-white rounded shadow">
            <div className="flex justify-between p-1 items-top">
              <span className="text-2xl font-light leading-1 font-display">
                atendimento para você
              </span>
            </div>

            <hr className="border-neutral-300" />

            <div className="flex gap-6">
              <span className="text-[#106daf] font-bold">falar no chat</span>
            </div>
          </div>
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

  return
}
