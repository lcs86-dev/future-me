import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Delete,
  MessageSquare,
  Plus,
  X,
} from "lucide-react";
import { useRouter } from "next/router";

export default function FutureDetail() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" className="p-2">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Successful Entrepreneur</h1>
        <Button className="invisible p-2">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </header>
      <main className="p-8">
        <div className="w-full">
          <img
            alt="future self"
            className="aspect-square w-full h-full object-cover rounded-lg"
            src="/placeholder.svg?height=1080&width=1920"
          />
        </div>
        <div className="space-y-6 mb-8">
          <p>
            In this vision, I see myself as a successful entrepreneur, leading a
            thriving tech startup that's making a positive impact on the world.
            I've achieved a work-life balance that allows me to pursue my
            passions while also spending quality time with my loved ones.
          </p>
          <div className="flex space-x-2">
            <div className="flex items-center p-2 border">
              <Calendar className="mr-2" />{" "}
              <span className="font-semibold">2030-01-01</span>
            </div>
            <div className="flex items-center p-2 border">
              <Clock className="mr-2" />{" "}
              <span className="font-semibold">10:00 AM</span>
            </div>
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Personal Notes:
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  21/10/2024, 21:51:46
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                className="min-h-[100px] w-full p-3"
                placeholder="Write about your thoughts, feelings, or steps to achieve this future vision..."
              />
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Another Note
            </Button>
          </div>
        </div>
        <Button className="w-full py-6 px-8 text-lg">
          <MessageSquare className="w-5 h-5 mr-2" /> Chat with Future Self
        </Button>
      </main>
    </div>
  );
}