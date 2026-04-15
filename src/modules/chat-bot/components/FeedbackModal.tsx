import { Button } from "@/src/components/ui/button";
import { BsRobot } from "react-icons/bs";
import { IoChevronBack } from "react-icons/io5";

export const FeedbackModal = ({
  onClose,
  onFeedback,
}: {
  onClose: () => void;
  onFeedback: (positive: boolean) => void;
}) => (
  <div className="flex h-full w-full flex-col items-center justify-center rounded-lg  text-center">
    <div className="fixed left-0 top-0 ">
      <button
        onClick={onClose}
        className="text-primary cursor-pointer hover:border border-base-200 rounded-full p-2"
        aria-label="Close chat"
      >
        <IoChevronBack size={25} />
      </button>
    </div>
    <div className="border-8 border-primary mb-3 rounded-full text-center">
      <BsRobot />
    </div>
    <h2 className="mt-2 text-sm font-bold text-gray-700">Did we help you?</h2>
    <h1 className="mt-1 text-sm font-bold text-gray-700">
      Your Feedback Matters
    </h1>
    <h3 className="mt-1 text-sm text-gray-900">
      Have you benefited from the services you received
      <span className="block"> from us?</span>
    </h3>
    <div className="mt-4 flex gap-6 pb-1 pt-4">
      <Button
        onClick={() => onFeedback(true)}
        className="px-6"
      >
        YES
      </Button>
      <Button
        variant="outline"
        onClick={() => onFeedback(false)}
        className="px-6"

      >
        NO
      </Button>
    </div>
  </div>
);
