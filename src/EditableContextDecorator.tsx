import { makeDecorator, useGlobals } from "@storybook/addons";
import React, { Context } from "react";
import { EditableContext } from "./ReactEditableContext";


/**
 * A struct for indicating an editable context field
 * @param name the display name on the tooltip
 * @param field the field of the context associated to this Param
 * @param vals a list of the values you can select for the field in the tooltip (they must be strings)
 * @param names a list of the names associated with the values. They should appear in the same order.
 * @param default the default value selected
 **/
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


/**
 * make a decorator for creating the context you want to edit.
 * @param Ctx the context you want to be able to edit
 * @param params a list with the parameters you want to be able to edit in the context, which are references to Ctx parameters
 **/
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
