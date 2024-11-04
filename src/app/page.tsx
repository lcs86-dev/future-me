"use client";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { PopoverTrigger } from "@radix-ui/react-popover";
import {
  ArrowLeft,
  Calendar,
  CalendarIcon,
  Clock,
  Image,
  WalletMinimal,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Time options
const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const minutes = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const formatDate = (date: Date) => {
  return date?.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TimeSelect = ({ value, onChange, options, placeholder }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-2 border rounded-lg appearance-none bg-background"
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default function Home() {
  const form = useForm();

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [timePopoverOpen, setTimePopoverOpen] = useState(false);

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
            <h2>Write Your Vision</h2>
            <div className="flex items-center space-x-2">
              <WalletMinimal />
              <span>0 credits</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
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
                {/* <Label>When do you see this future?</Label> */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant={"outline"}
                                className="w-full sm:w-[320px] justify-start text-left font-normal"
                              >
                                <Calendar />
                                {formatDate(field.value)}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent>
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  /> */}
                  {/* <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Select a future date *
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      
                    </CardContent>
                  </Card> */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select a future date</FormLabel>
                        <FormControl>
                          <input
                            type="date"
                            value={field.value}
                            onChange={field.onChange}
                            min={new Date().toISOString().split("T")[0]}
                            // className="w-full p-2 border rounded-lg  text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                            className="bg-gray-50 border h-10 leading-none text-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </FormControl>
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
                          <div className="relative">
                            {/* <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </div> */}
                            <input
                              type="time"
                              id="time"
                              className="bg-gray-50 border h-10 leading-none text-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={field.value}
                              onChange={field.onChange}
                              required
                            />
                          </div>
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
