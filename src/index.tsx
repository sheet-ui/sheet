import {
  Modal,
  Dialog,
  Heading,
  ModalOverlay,
  type ModalOverlayProps,
} from "react-aria-components";

import {
  useRef,
  useEffect,
  forwardRef,
  useContext,
  createContext,
  type ReactNode,
  type ElementRef,
  type RefAttributes,
  type ComponentPropsWithoutRef,
  type ForwardRefExoticComponent,
} from "react";

import {
  motion,
  animate,
  useTransform,
  useMotionValue,
  AnimatePresence,
  useMotionTemplate,
  type HTMLMotionProps,
} from "framer-motion";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface SheetContentProps extends HTMLMotionProps<"div"> {
  grabber?: boolean;
  children?: ReactNode;
}

function isSize(value: string): value is Size {
  return ["xs", "sm", "md", "lg", "xl"].includes(value);
}

const IPHONE_14_PRO_HEIGHT = 844;

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
} as const;

const inertiaTransition = {
  type: "inertia",
  timeConstant: 300,
  bounceDamping: 40,
  bounceStiffness: 300,
} as const;

const SHEET_MARGINS = {
  xl: 34,
  lg: 192,
  md: 350,
  sm: 445,
  xs: 540,
} as const;

const MotionModal = motion.create(
  Modal as ForwardRefExoticComponent<RefAttributes<HTMLDivElement>>
);

const MotionModalOverlay = motion.create(
  ModalOverlay as ForwardRefExoticComponent<
    ModalOverlayProps & RefAttributes<HTMLDivElement>
  >
);

const SheetContext = createContext<{
  size: Size;
  isOpen: boolean;
  onDismiss: () => void;
} | null>(null);

export function Sheet({
  size,
  isOpen,
  children,
  onDismiss,
}: {
  size: Size;
  isOpen: boolean;
  children: ReactNode;
  onDismiss: () => void;
}) {
  return (
    <SheetContext.Provider value={{ size, isOpen, onDismiss }}>
      {children}
    </SheetContext.Provider>
  );
}

export const SheetHeader = forwardRef<
  ElementRef<typeof Heading>,
  ComponentPropsWithoutRef<typeof Heading>
>(({ children, ...props }, ref) => (
  <Heading ref={ref} slot="title" {...props}>
    {children}
  </Heading>
));

export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  ({ style, grabber = true, children, ...props }, ref) => {
    const context = useContext(SheetContext);

    if (!context) {
      throw new Error(
        "<SheetContent> must be used within a <Sheet> component."
      );
    }

    const { isOpen, onDismiss } = context;
    const size = context.size.trim().toLowerCase();

    if (!isSize(size)) {
      throw new Error(`Invalid size: ${size}.`);
    }

    const rootRef = useRef<Element>();
    const windowRef = useRef<Window>();
    const windowHeight = windowRef.current?.innerHeight || IPHONE_14_PRO_HEIGHT;
    const SHEET_MARGIN = SHEET_MARGINS[size];
    const h = windowHeight - SHEET_MARGIN;
    const y = useMotionValue(h);
    const bgOpacity = useTransform(y, [0, h], [0.4, 0]);
    const bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

    useEffect(() => {
      rootRef.current = document.body.children[0];
      windowRef.current = window;
    }, []);

    return (
      <AnimatePresence>
        {isOpen && (
          <MotionModalOverlay
            isOpen={isOpen}
            onTap={onDismiss}
            onOpenChange={onDismiss}
            style={{
              inset: 0,
              zIndex: 10,
              position: "fixed",
              backgroundColor: bg,
            }}
          >
            <MotionModal
              ref={ref}
              exit={{ y: h }}
              initial={{ y: h }}
              animate={{ y: 0 }}
              transition={staticTransition}
              style={{
                y,
                bottom: 0,
                width: "100%",
                top: SHEET_MARGIN,
                position: "absolute",
                willChange: "transform",
                borderTopLeftRadius: "0.75rem",
                borderTopRightRadius: "0.75rem",
                paddingBottom: window.screen.height,
                backgroundColor: "rgb(243, 232, 255)",
                ...style,
              }}
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > window.innerHeight * 0.75 || velocity.y > 300) {
                  onDismiss();
                } else {
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }}
              {...props}
            >
              {grabber && (
                <div
                  id="grabber"
                  style={{
                    width: "3rem",
                    height: "0.375rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "0.5rem",
                    borderRadius: "9999px",
                    backgroundColor: "rgb(156, 163, 175)",
                  }}
                />
              )}
              <Dialog style={{ outline: "none" }}>{children}</Dialog>
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    );
  }
);
