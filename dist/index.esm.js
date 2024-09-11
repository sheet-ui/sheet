// src/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function MyComponent({
  children,
  person
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    children,
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: person.name }),
      /* @__PURE__ */ jsx("h2", { children: person.age })
    ] })
  ] });
}
export {
  MyComponent
};
