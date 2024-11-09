"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import {
  ArrowLeft,
  Award,
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Eye,
  Loader2,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const futureFormSchema = z.object({
  vision: z.string().min(50, {
    // message: "Vision must be at least 50 characters.",
    message:
      "Please write at least 50 characters.",
  }),
  date: z.date({
    required_error: "A date of vision is required.",
  }),
  time: z.string().optional(),
});

type FutureFormSchema = z.infer<typeof futureFormSchema>;

const defaultValues: Partial<FutureFormSchema> = {
  vision: "",
  date: new Date(),
  time: new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date()),
};

const visionExample = `In my sun-filled home office, I'm reviewing the latest AI model my team has developed. 
The sense of innovation is palpable. On my desk, next to cutting-edge devices, sits a 
photo from our recent team celebration at a major tech conference. The soft hum of my 
quantum computer blends with the excited chatter from the virtual meeting displayed on 
my holographic screen. I feel a deep sense of pride and excitement for the future we're shaping.`;

export default function Home() {
  const form = useForm<FutureFormSchema>({
    resolver: zodResolver(futureFormSchema),
    defaultValues,
  });

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExampleOpen, setIsExampleOpen] = useState(false);

  const onSubmit = (data: FutureFormSchema) => {
    console.log(data);
    generateImage();
  };

  const generateImage = async () => {
    setIsGenerating(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // const imageUrl = `/api/placeholder/800/450`;
      // setGeneratedImage(imageUrl);
    } catch (err) {
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen space-y-4">
      <header className="flex items-center gap-4">
        <Button variant={"ghost"} size="icon" className="p-2 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold">Future Self Vision</h1>
      </header>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Write Your Vision</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
          <CreditCard className="w-4 h-4" />
          <span className="text-sm font-medium">5 credits</span>
        </div>
      </div>

      <Collapsible
        open={isExampleOpen}
        onOpenChange={setIsExampleOpen}
        className="w-full border rounded-lg transition-all duration-200 ease-in-out"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-left">
          <span className=" text-base">Vision Example</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isExampleOpen ? "transform rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 pt-0 text-sm text-muted-foreground">
          <p>{visionExample}</p>
        </CollapsibleContent>
      </Collapsible>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Form {...form}>
          <FormField
            control={form.control}
            name="vision"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Imagine Your Future Self
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full h-48 p-4 resize-none border rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Describe your future self. What have you accomplished? How do you feel in this moment? What is different in your life? What fills your days? Who shares this moment with you?"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>0/50 characters minimum</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-lg">Select a future date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className="w-[240px] pl-3 text-left font-normal"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a Date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Time of day</FormLabel>
                <FormControl>
                  <input
                    type="time"
                    id="time"
                    className="block h-10 w-[200px] rounded-lg border border-input bg-background px-3 py-1.5 text-sm focus:outline-none hover:bg-secondary"
                    // className="w-[200px] text-left font-normal bg-gray-50 border h-10 leading-none text-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              "See Your Future Vision"
            )}
          </Button>
        </Form>
      </form>

      {/* {generatedImage && !isGenerating && (
        <Card>
          <CardHeader>
            <CardTitle>Your Future Self</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4 h-[400px] flex flex-col justify-center items-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <Image className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm">
                  Write your vision to see your future self
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  The more detailed your description, the better the
                  visualization
                </p>
              </div>
            </div>
            <Button type="submit" className="w-full">
              {isGenerating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-t-2 border-primary-foreground rounded-full animate-spin" />
                  Generating Vision...
                </div>
              ) : (
                "Save Vision"
              )}
            </Button>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
}
