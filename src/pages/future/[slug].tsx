import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Clock, Plus } from "lucide-react";
import { useRouter } from "next/router";

export default function FutureDetail() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between pb-2 border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Go back</span>
          </Button>
          <h1 className="text-xl font-medium text-gray-700">Your Future Self: Successful Entrepreneur</h1>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between pb-2 border-b">
        <img alt="future self" className="aspect-square w-full" src="" />
      </div>
      <div>
        In this vision, I see myself as a successful entrepreneur, leading a
        thriving tech startup that's making a positive impact on the world. I've
        achieved a work-life balance that allows me to pursue my passions while
        also spending quality time with my loved ones.
      </div>
      <div className="flex">
        <div className="flex-1 border">
          <Calendar /> 2030-01-01
        </div>
        <div className="flex-1 border">
          <Clock /> 10:00 AM
        </div>
      </div>
      <div className="bg-primary p-4">
        <h3>Personal Notes:</h3>
        <div>
          <Textarea />
        </div>
        <Button variant="outline" className="w-full">
          <Plus /> Add Another Note
        </Button>
      </div>
    </div>
  );
}
