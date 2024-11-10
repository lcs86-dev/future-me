"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Share2,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function VisionDetail() {
  const router = useRouter();

  const [actionSteps, setActionSteps] = useState([
    { id: 1, text: "Practice presentation", completed: false },
    { id: 2, text: "Review slides with team", completed: false },
    { id: 3, text: "Prepare for Q&A session", completed: false },
  ]);
  const [newStep, setNewStep] = useState("");

  const navigateToPreviousPage = () => {
    router.back();
  };

  const handleToggleStep = (id: number) => {
    setActionSteps(
      actionSteps.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const handleDeleteStep = (id: number) => {
    setActionSteps(actionSteps.filter((step) => step.id !== id));
  };

  const handleAddStep = () => {
    // event.preventDefault();
    if (newStep.trim()) {
      setActionSteps([
        ...actionSteps,
        { id: Date.now(), text: newStep.trim(), completed: false },
      ]);
      setNewStep("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen space-y-4">
      <header className="flex items-center gap-4">
        <Button
          variant={"ghost"}
          size="icon"
          className="p-2 rounded-full"
          onClick={navigateToPreviousPage}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold">Future Self Vision</h1>
        <div className="flex-1"></div>
        <div className="flex justify-between space-x-2">
          <Button variant="ghost" size="sm">
            <Heart className={`h-5 w-5`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share vision</span>
          </Button>
        </div>
      </header>
      <div className="relative group">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Photo by Drew Beamer"
            fill
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
        {/* <img
          src={
            "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          }
          alt="Future vision visualization"
          className={`w-full rounded-lg shadow-lg transition-all duration-300
          }`}
        /> */}
        {/* {isMotivationalMode && (
          <div className="absolute inset-0 flex items-center justify-center p-8 text-white">
            <p className="text-2xl font-bold text-center">
              Every small step you take right now shapes the future you
              envision.
            </p>
          </div>
        )} */}
      </div>
      <Card>
        <CardContent className="pt-6 border-none">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Tuesday, March 5, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>4:30 PM</span>
              </div>
            </div>
            {/* <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <PenLine className="w-4 h-4" />
              <span className="text-sm">Edit Vision</span>
            </button> */}
          </div>

          <h1 className="text-2xl font-semibold mb-2">My Vision</h1>
          <p className="text-gray-700 leading-relaxed">
            I see myself efficiently completing the project presentation,
            delivering it with confidence. The slides are well-organized, and
            Ive practiced enough to explain everything clearly. My team members
            are impressed with the results, and weve received positive feedback
            from stakeholders.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="action-steps">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="action-steps">Action Steps</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="ai-guide">AI Guide</TabsTrigger>
          <TabsTrigger value="wisdom">Wisdom</TabsTrigger>
        </TabsList>
        <TabsContent value="action-steps">
          <Card>
            <CardContent className="pt-6">
              {actionSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-center justify-between gap-4 bg-gray-50 p-2 rounded-xl mb-2"
                >
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      className="p-2 rounded-md hover:bg-gray-200 transition-colors focus:outline-none "
                      onClick={() => handleToggleStep(step.id)}
                    >
                      <CheckCircle2
                        className={`h-6 w-6 ${
                          step.completed ? "text-green-500" : "text-gray-300"
                        }`}
                      />
                      <span className="sr-only">
                        {step.completed
                          ? "Mark as incomplete"
                          : "Mark as complete"}
                      </span>
                    </Button>
                    <span
                      className={`text-base ${
                        step.completed ? "line-through" : ""
                      }`}
                    >
                      {step.text}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteStep(step.id)}
                  >
                    <Trash2 className="h-5 w-5 text-destructive" />
                    <span className="sr-only">Delete step</span>
                  </Button>
                </div>
              ))}
              <div className="flex w-full items-center space-x-2 mt-6">
                <Input
                  value={newStep}
                  onChange={(e) => setNewStep(e.target.value)}
                  placeholder="Take your new action step..."
                />
                <Button type="submit" onClick={handleAddStep}>
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
