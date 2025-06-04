import { Transition } from "@headlessui/react";
import React from "react";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
  collapsible: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue>({
  openItems: [],
  toggleItem: () => {},
  type: "single",
  collapsible: false,
});

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Accordion container component that manages the state of accordion items
 * @param {object} props - Component props
 * @param {"single" | "multiple"} [props.type="single"] - Accordion type
 * @param {boolean} [props.collapsible=false] - Whether items can be collapsed
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Child elements
 * @returns {JSX.Element} - Accordion container
 * @example
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">...</AccordionItem>
 * </Accordion>
 */
export function Accordion({
  type = "single",
  collapsible = false,
  className,
  children,
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prevOpen) => {
      if (type === "single") {
        if (prevOpen[0] === value) {
          return collapsible ? [] : prevOpen;
        }
        return [value];
      }
      if (prevOpen.includes(value)) {
        return prevOpen.filter((v) => v !== value);
      }
      return [...prevOpen, value];
    });
  };

  return (
    <AccordionContext.Provider
      value={{ openItems, toggleItem, type, collapsible }}
    >
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

const ItemValueContext = React.createContext<string>("");

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Individual accordion item component
 * @param {object} props - Component props
 * @param {string} props.value - Unique identifier for the item
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} - Accordion item
 */
export function AccordionItem({
  value,
  children,
  className,
}: AccordionItemProps) {
  return (
    <ItemValueContext.Provider value={value}>
      <div data-accordion-item={value} className={className}>
        {children}
      </div>
    </ItemValueContext.Provider>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Accordion trigger button component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} - Trigger button
 */
export function AccordionTrigger({
  children,
  className,
}: AccordionTriggerProps) {
  const { openItems, toggleItem } = React.useContext(AccordionContext);
  const itemValue = React.useContext(ItemValueContext);
  const isOpen = openItems.includes(itemValue);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${itemValue}`}
      className={[
        "flex w-full items-center justify-between py-4 font-medium transition-all cursor-pointer",
        isOpen ? "" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => toggleItem(itemValue)}
      id={`accordion-trigger-${itemValue}`}
    >
      <span>{children}</span>
      <span
        className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        aria-hidden="true"
      >
        ▼
      </span>
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Accordion content component with animation
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} - Animated content container
 */
export function AccordionContent({
  children,
  className,
}: AccordionContentProps) {
  const { openItems } = React.useContext(AccordionContext);
  const itemValue = React.useContext(ItemValueContext);
  const isOpen = openItems.includes(itemValue);

  return (
    <Transition
      show={isOpen}
      enter="transition-all duration-300 ease-out"
      enterFrom="opacity-0 max-h-0"
      enterTo="opacity-100 max-h-fit"
      leave="transition-all duration-200 ease-in"
      leaveFrom="opacity-100 max-h-fit"
      leaveTo="opacity-0 max-h-0"
    >
      <div
        id={`accordion-content-${itemValue}`}
        aria-labelledby={`accordion-trigger-${itemValue}`}
        className={["overflow-hidden", className].filter(Boolean).join(" ")}
      >
        <div className="pb-4 max-h-fit overflow-auto [scrollbar-color:_#4f46e5_transparent] [scrollbar-width:_thin]">
          {children}
        </div>
      </div>
    </Transition>
  );
}
