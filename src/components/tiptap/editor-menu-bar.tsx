"use client";

import { MoreHorizontal } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useEditor } from "./editor-context";
import type { MenuBarAction } from "./editor-menu-bar-actions";

interface MenuBarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}
const MenuBarButton = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<MenuBarButtonProps>
>(({ active, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn("rounded-md p-2 hover:bg-primary/10", {
        "bg-primary/5 text-secondary-foreground": active,
        "text-secondary-foreground/50 hover:text-secondary-foreground": !active,
        "text-secondary-foreground/20": disabled,
      })}
      {...props}
      disabled={disabled}
    />
  );
});

interface TipTapMenuBarProps {
  actions: Array<MenuBarAction>;
}

const MENU_ITEM_WIDTH = 32;

export function EditorMenuBar({
  children,
  actions,
}: React.PropsWithChildren<TipTapMenuBarProps>) {
  const editor = useEditor();
  const [dropdownMenuitems, setDropDownMenuItems] = React.useState<
    Array<MenuBarAction>
  >([]);
  const [visibleMenuItems, setVisibleMenuItems] =
    React.useState<Array<MenuBarAction>>(actions);
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleResize() {
      if (!navRef.current) return null;
      const navWidth = navRef.current.getBoundingClientRect().width;
      const maxVisibleItems = Math.floor(navWidth / MENU_ITEM_WIDTH) - 1; // -1 for dropdown menu
      if (maxVisibleItems > actions.length) {
        return;
      }
      const visibleItems = actions.slice(0, maxVisibleItems);
      const dropdownItems = actions.slice(maxVisibleItems);
      setDropDownMenuItems(dropdownItems);
      setVisibleMenuItems(visibleItems);
    }

    const resizeObserver = new ResizeObserver(handleResize);
    if (navRef.current) resizeObserver.observe(navRef.current);
    handleResize();
    return () => resizeObserver.disconnect();
  }, [actions]);

  return (
    <TooltipProvider>
      <div className="flex gap-x-4 bg-muted">
        <nav className="relative flex flex-1 overflow-hidden" ref={navRef}>
          {visibleMenuItems.map((item) => (
            <Tooltip key={`nav-item-${item.name}`}>
              <TooltipTrigger asChild itemID={item.name} id={item.name}>
                <MenuBarButton
                  onClick={() => item.handleOnClick(editor)}
                  disabled={item.isDisabled?.(editor)}
                  active={item.isActive?.(editor)}
                >
                  <item.Icon className="h-4 w-4" />
                </MenuBarButton>
              </TooltipTrigger>
              <TooltipContent>{item.tooltip}</TooltipContent>
            </Tooltip>
          ))}
          {dropdownMenuitems.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-md p-2 text-secondary-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {dropdownMenuitems.map((item) => (
                  <DropdownMenuItem
                    asChild
                    className="flex gap-x-2"
                    key={`dropdown-menu-item-${item.name}`}
                  >
                    <MenuBarButton
                      onClick={() => item.handleOnClick(editor)}
                      disabled={item.isDisabled?.(editor)}
                      active={item.isActive?.(editor)}
                    >
                      <item.Icon className="h-4 w-4" />
                      {item.tooltip}
                    </MenuBarButton>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
        <div className="my-auto mr-4">{children}</div>
      </div>
    </TooltipProvider>
  );
}
