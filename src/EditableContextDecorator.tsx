import { makeDecorator, useGlobals } from "@storybook/addons";
import React, { Context } from "react";
import { EditableContext } from "./ReactEditableContext";


/**
 * a struct for indicating an editable context field
 **/
type Param = {
  /**
   * the display name on the tooltip
   **/
  name: string;
  /**
   * the field of the context associated to this Param
   **/
  field: string;
  /**
   * a list of the values you can select for the field in the tooltip (they must be strings)
   **/
  vals: string[];
  /**
   * a list of the names associated with the values. They should appear in the same order.
   **/
  names: string[];
  /**
   * the default value selected
   **/
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
