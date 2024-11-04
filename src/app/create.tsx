"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowLeft,
  CalendarIcon,
  Clock,
  CreditCard,
  Moon,
  RefreshCw,
  Save,
  Sun,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  dof: z.date({
    required_error: "A date of future is required.",
  }),
  content: z.string({
    required_error: "A content is required",
  }),
});

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();
  // const [generationsLeft, setGenerationsLeft] = useState(3);
  // const [isGenerating, setIsGenerating] = useState(false);

  // const handleGenerate = () => {
  //   setIsGenerating(true);
  //   setGenerationsLeft((prev) => prev - 1);
  //   setTimeout(() => {
  //     setIsGenerating(false);
  //   }, 2000);
  // };

  // const toggleDarkMode = () => setDarkMode(!darkMode);

  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  // });

  // const onSubmit = (data: z.infer<typeof FormSchema>) => {
  //   console.log("onSubmit", data);
  // };

  const [visionDescription, setVisionDescription] = useState("");
  const [futureDate, setFutureDate] = useState("");
  const [futureTime, setFutureTime] = useState("");
  const [remainingGenerations, setRemainingGenerations] = useState(2);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("write");

  const handleGenerate = () => {
    console.log("handleGenerate", remainingGenerations);
    if (remainingGenerations > 0) {
      setRemainingGenerations((prev) => prev - 1);
      // Simulating image generation
      setGeneratedImage("/placeholder.svg?height=400&width=600");
      setActiveTab("preview");
    }
  };

  const handleSave = () => {
    router.push('/future/rich')
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${
        darkMode ? "dark" : ""
      }`}
    >
      <header className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" className="p-2">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Visualize Your Future Self</h1>
        <Button className="invisible p-2">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </header>

      <main className="p-4 max-w-2xl mx-auto space-y-8">
        {remainingGenerations === 0 && (
          <Card className="bg-secondary">
            <CardContent className="px-4 py-2 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {remainingGenerations} generations left
                </span>
              </div>
              <Button size="sm">
                <CreditCard className="mr-2 h-4 w-4" />
                Upgrade
              </Button>
            </CardContent>
          </Card>
        )}

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2 text-sm">
            <TabsTrigger value="write">Write Your Vision</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write" className="space-y-8">
            <Textarea
              placeholder="Describe your future self in detail. Be specific about your appearance, surroundings, and achievements. Include sensory details: What do you see, hear, or feel in this future moment? Describe your emotional state and body language. Mention any significant objects or symbols of your success. Consider the technological advancements that might be present in your future scenario."
              className="min-h-[200px] text-sm"
              value={visionDescription}
              onChange={(e) => setVisionDescription(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="future-date" className="text-sm font-medium">
                  Select a future date *
                </label>
                <Input
                  id="future-date"
                  type="date"
                  value={futureDate}
                  onChange={(e) => setFutureDate(e.target.value)}
                  required
                  className="text-sm inline-block"
                />
                {/* <Popover>
                  <PopoverTrigger className="w-full">
                    <Button
                      variant="outline"
                      className="flex w-full justify-between items-center"
                    >
                      <span>yyyy / mm / dd</span>
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar />
                  </PopoverContent>
                </Popover> */}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="future-time"
                  className="text-sm font-medium mb-1"
                >
                  Time of day (optional)
                </label>
                <Input
                  id="future-time"
                  type="time"
                  value={futureTime}
                  onChange={(e) => setFutureTime(e.target.value)}
                  className="text-sm inline-block"
                />
                {/* <Button
                  variant="outline"
                  className="flex justify-between items-center"
                >
                  <span>--:-- --</span>
                  <Clock />
                </Button> */}
              </div>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground space-x-2"
              onClick={handleGenerate}
              disabled={
                !visionDescription || !futureDate || remainingGenerations === 0
              }
            >
              <Wand2 className="h-5 w-5" />
              Generate Your Future Image
            </Button>
          </TabsContent>
          <TabsContent value="preview" className="space-y-4">
            {generatedImage ? (
              <>
                <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                  <img
                    src=""
                    alt="Generated future self"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Your Future Vision</h3>
                  <p className="text-sm text-muted-foreground">
                    {futureDate && futureTime
                      ? `on ${format(
                          new Date(`${futureDate}T${futureTime}`),
                          "EEEE, MMMM do, yyyy 'at' HH:mm"
                        )}`
                      : "Date and time not specified"}
                  </p>
                </div>
                <Button className="w-full bg-primary text-primary-foreground" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Your Future Image
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Generate an image to see the preview here.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}