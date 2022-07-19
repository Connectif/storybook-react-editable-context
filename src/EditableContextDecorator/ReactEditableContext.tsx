import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import {
  Icons,
  IconButton,
  WithTooltip,
  TooltipLinkList,
} from "@storybook/components";
import { TOOL_ID } from "../constants";
import addons from "@storybook/addons";
import { FORCE_RE_RENDER } from "@storybook/core-events";
import {
  EditableContext as EditableContextType,
  Param,
} from "./EditableContextDecorator";

const createSelectorItem = (
  name: string,
  value: string,
  change: (arg: { selected: string; name: string }) => void,
  active: boolean
) => ({
  id: name,
  title: name,
  onClick: () => {
    change({ selected: value, name });
  },
  value,
  active,
});

const getDisplayedItems = (
  items: { name: string; value: string }[],
  selectedValue: string,
  change: (arg: { selected: string; name: string }) => void
) => {
  const backgroundSelectorItems = items.map(
    ({ name, value }: { name: string; value: string }) =>
      createSelectorItem(name, value, change, value === selectedValue)
  );

  return backgroundSelectorItems;
};

const EditableContext = () => {
  const [{ context, myAddon }, updateGlobals] = useGlobals();

  const contextData = {...context};

  const toggleMyTool = useCallback(
    () =>
      updateGlobals({
        myAddon: myAddon ? undefined : true,
      }),
    [myAddon]
  );

  const updateVal = () => {
    updateGlobals({ context: contextData });
    addons.getChannel().emit(FORCE_RE_RENDER);
  };

  if (context === undefined) {
    return <></>;
  }

  context.params.forEach((param: Param) => {
    if (contextData.val[param.field] === undefined)
      contextData.val[param.field] = param.default;
  });

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={context.params.map((param: Param) => (
        <div key={param.field} className="editable-context-param">
          <h2
            style={{
              padding: "7px 15px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {param.name}
          </h2>
          <TooltipLinkList
            links={getDisplayedItems(
              param.vals.map((value: string, index: number) => ({
                name: param.names[index],
                value: value,
              })),
              contextData.val[param.field],
              ({ selected }) => {
                contextData.val[param.field] = selected;
                updateVal();
              }
            )}
          />
        </div>
      ))}
    >
      <IconButton
        key={TOOL_ID}
        active={myAddon}
        title="ReactEditableContext"
        onClick={toggleMyTool}
      >
        <Icons icon="cog" />
      </IconButton>
    </WithTooltip>
  );
};

export { EditableContext };
