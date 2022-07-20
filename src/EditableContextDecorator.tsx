import { makeDecorator, useGlobals } from "@storybook/addons";
import React, { Context } from "react";
import { EditableContext } from "./ReactEditableContext";

type Param = {
  name: string;
  field: string;
  vals: string[];
  names: string[];
  default: string;
};

type EditableContext = {
  params?: Param[];
  val?: any;
};

let editableContext: EditableContext = {};

const editableContextDecorator = (Ctx: Context<any>, params: Param[]) => {
  editableContext.params = params;
  editableContext.val = {};

  editableContext.params.forEach(
    (param: Param) => (editableContext.val[param.field] = param.default)
  );

  return makeDecorator({
    name: "EditableContextDecorator",
    parameterName: "",
    wrapper: (Story: any) => {
      let [{ context: ctx }, updateGlobals] = useGlobals();
      if (ctx === undefined || ctx === null) {
        ctx = editableContext;
        updateGlobals({ context: ctx });
      }

      return (
        <Ctx.Provider value={ctx.val}>
          <Story />
        </Ctx.Provider>
      );
    },
  });
};

export type { EditableContext, Param };

export { editableContextDecorator, editableContext };
