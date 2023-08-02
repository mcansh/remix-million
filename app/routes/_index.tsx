import type { V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { block } from "million/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type Props = {
  number: number;
};

let CSRBlock = block(
  function CSR({ number }: Props) {
    return <div>client rendered {number}</div>;
  },
  { ssr: false }
);

let SSRBlock = block(function SSR({ number }: Props) {
  return <div>server rendered {number}</div>;
});

export async function loader() {
  return {
    csr: Math.random(),
    ssr: Math.random(),
  };
}

export default function Index() {
  let { csr, ssr } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <CSRBlock number={csr} />
      <SSRBlock number={ssr} />
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
