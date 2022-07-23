import { useAppSelector } from "./useAppSelector";

export const useCummulativeCode = (cellId: string) => {
  return useAppSelector((state) => {
    const { data, order } = state.cell;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
          const root = document.querySelector("#root")
          if(typeof value === 'object') {
            if(value.$$typeof && value.props) {
              _ReactDOM.render(value, root)
            } else {
              root.innerHTML = JSON.stringify(value)
            }
          }
          else {
            root.innerHTML = value
          }
        };
      `;

    const showFuncNoop = "var show = () => {}";

    const cummulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cummulativeCode.push(showFunc);
        } else {
          cummulativeCode.push(showFuncNoop);
        }
        cummulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }

    return cummulativeCode;
  }).join("\n");
};
