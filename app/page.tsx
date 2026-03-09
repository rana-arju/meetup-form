import { Heart, Users, Clock, Mail } from "lucide-react";
import { ReunionForm } from "@/components/ReunionForm";

export default function ReunionPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1a2a4a] to-[#111827]" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#F59E0B]/20 to-[#EC4899]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-[#8B5CF6]/20 to-[#06B6D4]/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section - Static HTML */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 py-12 sm:py-20"
      >
        <div className="text-center max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 mb-6 sm:mb-8 max-w-full">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[#F59E0B] flex-shrink-0" />
            <span className="text-[10px] sm:text-sm text-[#FFF7ED]/80 leading-tight text-center">
              Cox's Bazar Polytechnic Institute • CSE • Session 2019-20
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 text-balance px-2">
            <span className="bg-gradient-to-r from-[#FFF7ED] via-[#F59E0B] to-[#FFF7ED] bg-clip-text text-transparent">
              আবার একসাথে
            </span>
            <br />
            <span className="text-[#FFF7ED]">সেই পুরোনো দিনগুলোর টানে</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#CBD5E1] mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            ২०२३ সালে ডিপ্লোমা শেষ করার পর জীবন সবাইকে ব্যস্ত করে ফেলেছে। তবুও
            কিছু সম্পর্ক, কিছু স্মৃতি, কিছু হাসি—সময় পেরিয়ে গেলেও মুছে যায়
            না। ঈদের পর কয়েকটা দিনের মধ্যে আমরা আবার একসাথে হতে চাই।
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <a
              href="#form"
              className="inline-flex items-center justify-center bg-[#F59E0B] hover:bg-[#DC8502] text-[#0F172A] font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 rounded-lg w-full sm:w-auto transition-colors"
            >
              আমি আসতে চাই
            </a>
            <a
              href="#details"
              className="inline-flex items-center justify-center border border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B]/10 font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 rounded-lg w-full sm:w-auto transition-colors"
            >
              বিস্তারিত দেখুন
            </a>
          </div>

          <div className="mt-10 sm:mt-16 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#F59E0B]/20 to-[#EC4899]/20 border border-[#F59E0B]/30 max-w-full">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B] flex-shrink-0" />
            <span className="text-sm sm:text-base text-[#FFF7ED]">
              ঈদের পর, ইনশাআল্লাহ
            </span>
          </div>
        </div>
      </section>

      {/* Emotional Message Section */}
      <section
        id="message"
        className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFF7ED] mb-6 sm:mb-8 text-balance">
                এই আয়োজন শুধু একটা মিট-আপ না
              </h2>
              <p className="text-[#CBD5E1] text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                এটা আমাদের একসাথে কাটানো সময়গুলোর প্রতি ভালোবাসা।
              </p>
              <p className="text-[#CBD5E1] text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                একই ক্লাসরুম, একই ল্যাব, একই বেঞ্চ, একই টেনশন, একই স্বপ্ন—সবকিছু
                মিলিয়ে আমাদের জীবনের একটা বিশেষ অধ্যায়।
              </p>
              <p className="text-[#CBD5E1] text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                আজ আমরা যে যেখানেই থাকি না কেন, সেই দিনগুলোর স্মৃতি এখনো আমাদের
                ভেতরে বেঁচে আছে।
              </p>
              <p className="text-[#CBD5E1] text-sm sm:text-base md:text-lg leading-relaxed">
                তাই চাই, আবার একদিন সবাই মিলে বসি, গল্প করি, হাসি, ছবি তুলি, আর
                কিছু নতুন স্মৃতি তৈরি করি।
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/20 to-transparent rounded-2xl blur-2xl" />
              <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-[#1E293B]/80 to-[#111827]/80 border border-[#F59E0B]/20 backdrop-blur-sm">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F59E0B] mb-4 sm:mb-6" />
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#FFF7ED] leading-relaxed italic">
                  "সময় চলে যায়, মানুষ ব্যস্ত হয়ে যায়, কিন্তু সত্যিকারের
                  স্মৃতিগুলো কখনো পুরোনো হয় না।"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Reunion Matters */}
      <section
        id="details"
        className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFF7ED] mb-10 sm:mb-12 md:mb-16 text-center px-2">
            কেন আসা উচিত?
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: "পুরোনো বন্ধুদের সাথে আবার দেখা",
                description:
                  "অনেকদিন পর সবার সাথে সামনাসামনি দেখা, গল্প আর আড্ডা—এটাই হবে এই আয়োজনের সবচেয়ে বড় আনন্দ।",
                icon: Users,
              },
              {
                title: "স্মৃতিগুলো আবার ছুঁয়ে দেখা",
                description:
                  "ক্লাস, প্র্যাকটিক্যাল, পরীক্ষা, ট্যুর, হাসি-মজা—সব পুরোনো মুহূর্তগুলো আবার মনে করার একটা সুন্দর সুযোগ।",
                icon: Heart,
              },
              {
                title: "নতুন করে সংযোগ তৈরি",
                description:
                  "জীবন সবাইকে আলাদা পথে নিয়ে গেছে, কিন্তু এই আয়োজন আমাদের আবার এক সুতোয় গেঁথে দিতে পারে।",
                icon: Mail,
              },
              {
                title: "একটা স্মরণীয় দিন",
                description:
                  "ব্যস্ত জীবনের ভিড়ে এমন একটা দিন দরকার, যেটা বহু বছর পরও মনে থাকবে।",
                icon: Clock,
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl bg-[#1E293B]/50 border border-[#334155] hover:border-[#F59E0B]/50 transition-colors">
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#F59E0B] mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#FFF7ED] mb-2 sm:mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#CBD5E1]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Info Section */}
      <section
        id="info"
        className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFF7ED] mb-10 sm:mb-12 md:mb-16 text-center px-2">
            প্রাথমিক পরিকল্পনা
          </h2>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/20 to-transparent rounded-2xl blur-2xl" />
            <div className="relative p-5 sm:p-8 md:p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-[#1E293B]/80 to-[#111827]/80 border border-[#F59E0B]/20 backdrop-blur-sm">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
                {[
                  { label: "আয়োজন", value: "CSE Get Together" },
                  {
                    label: "প্রতিষ্ঠান",
                    value: "Cox's Bazar Polytechnic Institute",
                  },
                  { label: "ব্যাচ", value: "Session 2019-20" },
                  { label: "ডিপ্লোমা সম্পন্ন", value: "2023" },
                  {
                    label: "সম্ভাব্য সময়",
                    value: "ঈদের পর কয়েক দিনের মধ্যে",
                  },
                  { label: "স্থান", value: "পরে সবাই মিলে ঠিক করা হবে" },
                  { label: "উদ্দেশ্য", value: "পুরোনো সহপাঠীদের পুনর্মিলনী" },
                ].map((item, index) => (
                  <div key={index}>
                    <p className="text-xs sm:text-sm text-[#F59E0B] font-semibold mb-1 sm:mb-2">
                      {item.label}
                    </p>
                    <p className="text-[#FFF7ED] text-sm sm:text-base md:text-lg">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#334155] pt-5 sm:pt-6 md:pt-8">
                <p className="text-[#CBD5E1] italic text-center text-xs sm:text-sm md:text-base leading-relaxed">
                  তারিখ, সময় ও ভেন্যু সবার মতামত এবং অংশগ্রহণকারীর উপস্থিতি
                  অনুযায়ী চূড়ান্ত করা হবে।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section - Lazy Loaded */}
      <ReunionForm />

      {/* Closing Section */}
      <section
        id="closing"
        className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFF7ED] mb-8 sm:mb-10 md:mb-12 text-balance px-2">
              চলো, আরেকবার সেই মানুষগুলোর কাছে ফিরে যাই
            </h2>

            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-[#CBD5E1] leading-relaxed mb-8 sm:mb-10 md:mb-12 px-2">
              <p>
                জীবনের ব্যস্ততায় সবাই দূরে সরে গেলেও, কিছু মানুষ আর কিছু স্মৃতি
                সবসময় আপন থেকে যায়।
              </p>
              <p>এই আয়োজন সেই আপন মানুষগুলোর জন্য।</p>
              <p>তোমার উপস্থিতিই এই মিলনমেলাকে পূর্ণ করবে।</p>
            </div>

            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#F59E0B]/20 to-[#EC4899]/20 border border-[#F59E0B]/30 max-w-full">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B] flex-shrink-0" />
              <span className="text-sm sm:text-base text-[#FFF7ED] font-semibold">
                ভালোবাসায় — CSE Session 2019-20
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
