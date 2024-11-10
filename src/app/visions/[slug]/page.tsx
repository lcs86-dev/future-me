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
  Pencil,
  Share2,
  Sparkles,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: "2024-03-04",
      content:
        "I'm feeling more confident about the presentation after today's practice session.",
      mood: "happy",
    },
  ]);
  const [newJournalEntry, setNewJournalEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState("happy");

  const [wisdomQuotes, setWisdomQuotes] = useState([
    {
      id: 1,
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "Inspiration",
      likes: 0,
    },
    {
      id: 2,
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
      category: "Motivation",
      likes: 0,
    },
    {
      id: 3,
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "Perseverance",
      likes: 0,
    },
  ]);

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

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "happy":
        return "😊";
      case "neutral":
        return "😐";
      case "sad":
        return "😔";
      default:
        return "";
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
        <TabsContent value="journal">
          <Card>
            <CardContent className="pt-6">
              {journalEntries.map((entry) => (
                <div key={entry.id}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {entry.date}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl" title={entry.mood}>
                        {getMoodEmoji(entry.mood)}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {entry.content}
                  </p>
                </div>
              ))}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <textarea
                  value={newJournalEntry}
                  onChange={(e) => setNewJournalEntry(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full p-3 border rounded-lg text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    {["happy", "neutral", "sad"].map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                          ${
                            selectedMood === mood
                              ? "bg-blue-100 scale-110"
                              : "hover:bg-gray-100"
                          }`}
                      >
                        {getMoodEmoji(mood)}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        // setShowJournalForm(false);
                        setNewJournalEntry("");
                        setSelectedMood("");
                      }}
                      className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {}}
                      disabled={!newJournalEntry.trim() || !selectedMood}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
                    >
                      Save Entry
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-guide" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Guide</CardTitle>
              <CardDescription>
                Personalized insights to boost your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-sm text-gray-500 italic">
                  Based on your vision and recent activities, here are some
                  tailored suggestions:
                </p>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-700 mb-2">
                      Presentation Power-Up
                    </h4>
                    <p className="text-gray-700">
                      Your confidence is growing! To take it further, try
                      recording a practice run. Watching yourself can reveal
                      areas for improvement and highlight your strengths. Aim
                      for a 25-minute presentation to leave room for questions.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-green-700 mb-2">
                      Team Synergy Boost
                    </h4>
                    <p className="text-gray-700">
                      Great job on reviewing slides with your team! Next,
                      consider assigning specific roles for the Q&A session.
                      This can help cover a broader range of potential questions
                      and showcase the teams collective expertise.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-700 mb-2">
                      Stakeholder Success Strategy
                    </h4>
                    <p className="text-gray-700">
                      To ensure positive stakeholder feedback, create a one-page
                      executive summary of your presentation. This gives a quick
                      overview and demonstrates your ability to distill complex
                      information – a skill highly valued by decision-makers.
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-orange-700 mb-2">
                      Momentum Maintainer
                    </h4>
                    <p className="text-gray-700">
                      Youre making great progress! To keep the momentum going,
                      set a small, achievable goal for each day leading up to
                      the presentation. This could be refining one slide,
                      practicing a specific section, or doing a quick team
                      check-in.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="wisdom" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Wisdom & Inspiration</CardTitle>
              <CardDescription>
                Quotes to motivate and guide you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wisdomQuotes.map((quote) => (
                  <div key={quote.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-4">
                      {/* <Sparkles className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" /> */}
                      <div className="flex-grow">
                        <span className="text-xs font-semibold text-purple-600 mb-1 block">
                          {quote.category}
                        </span>
                        <p className="text-purple-700 text-lg font-medium italic">
                          "{quote.text}"
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          - {quote.author}
                        </p>
                      </div>
                      {/* <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {}}
                        className="flex items-center gap-2"
                      >
                        <ThumbsUp
                          className={`h-5 w-5 ${
                            quote.likes > 0 ? "text-blue-500" : "text-gray-400"
                          }`}
                        />
                        <span className="text-sm font-medium">
                          {quote.likes}
                        </span>
                      </Button> */}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
