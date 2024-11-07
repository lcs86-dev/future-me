"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Image, WalletMinimal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const futureFormSchema = z.object({
  vision: z.string().min(50, {
    message: "Vision must be at least 50 characters.",
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
  time: new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date()),
}

export default function Home() {
  const form = useForm<FutureFormSchema>({
    resolver: zodResolver(futureFormSchema),
    defaultValues
  });

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [timePopoverOpen, setTimePopoverOpen] = useState(false);

  function onSubmit(data: FutureFormSchema) {
    console.log(data);
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="flex items-center gap-2 mb-6">
        <Button variant={"ghost"} size="icon" className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Future Self Vision</h1>
      </header>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <p>Write Your Vision</p>
            <div className="flex items-center space-x-2">
              <WalletMinimal />
              <span>0 credits</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="vision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your future self</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-48 resize-none"
                        placeholder="What have you achieved? How do you feel? What's different in your life? What are your daily activities? Who are you surrounded by?"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>0/50 characters minimum</FormDescription>
                  </FormItem>
                )}
              />
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Select a future date</FormLabel>
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
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
                        <FormLabel>Time of day</FormLabel>
                        <FormControl>
                          <input
                            type="time"
                            id="time"
                            className="w-[240px] text-left font-normal bg-gray-50 border h-10 leading-none text-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={field.value}
                            onChange={field.onChange}
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Generate Vision
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Future Self</CardTitle>
        </CardHeader>
        <CardContent>
          {!generatedImage && !isGenerating && (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
