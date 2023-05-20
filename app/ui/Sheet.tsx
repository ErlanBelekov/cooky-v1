import type { PropsWithChildren } from "react";

import * as Dialog from "@radix-ui/react-dialog";

interface SheetProps {
  isOpen: boolean;
  /**
   *
   * closeSheet is called to force closing of the component
   */
  closeSheet?: () => void;
}

/**
 * Sheet is a component which conditionally opens full-height view from left to right. Uses Radix-UI Dialog under the hood.
 */
export function Sheet(props: PropsWithChildren<SheetProps>): JSX.Element {
  if (!props.isOpen) {
    return <></>;
  }

  return (
    <Dialog.Root open={props.isOpen} modal={false}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black" />
        <Dialog.Content
          {...(props.closeSheet ? { onInteractOutside: props.closeSheet } : {})}
          className="fixed left-0 top-0 z-20 h-screen w-10/12 md:w-6/12"
        >
          {props.children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
