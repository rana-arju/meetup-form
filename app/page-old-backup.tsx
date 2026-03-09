'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heart, Users, Clock, Mail, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Zod schema with custom error messages
const ReunionFormSchema = z.object({
  fullName: z.string()
    .min(1, 'পূর্ণ নাম আবশ্যক')
    .min(3, 'নাম কমপক্ষে ৩ অক্ষর হতে হবে'),
  rollNumber: z.string().optional().default(''),
  phone: z.string()
    .min(1, 'মোবাইল নম্বর আবশ্যক')
    .regex(/^[\d\s\-\+]+$/, 'শুধুমাত্র সংখ্যা, স্পেস এবং হাইফেন ব্যবহার করুন')
    .refine((val) => {
      const digits = val.replace(/\D/g, '');
      return /^\d{10,11}$/.test(digits);
    }, 'মোবাইল নম্বর ১০-১১ অঙ্কের হতে হবে'),
  currentLocation: z.string().optional().default(''),
  interest: z.string()
    .min(1, 'আগ্রহের মাত্রা নির্বাচন করুন'),
  suggestions: z.string().optional().default(''),
  wantUpdates: z.boolean().default(true),
});

type ReunionFormInputs = z.infer<typeof ReunionFormSchema>;

export default function ReunionPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<ReunionFormInputs | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<ReunionFormInputs>({
    resolver: zodResolver(ReunionFormSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      rollNumber: '',
      phone: '',
      currentLocation: '',
      interest: '',
      suggestions: '',
      wantUpdates: true,
    },
  });

  const interestValue = watch('interest');
  const wantUpdatesValue = watch('wantUpdates');

  const onSubmit = (data: ReunionFormInputs) => {
    console.log('[v0] Form submitted with Zod validation:', data);
    setSuccessData(data);
    setShowSuccess(true);

    // Reset form after 4 seconds
    setTimeout(() => {
      reset();
      setShowSuccess(false);
      setSuccessData(null);
    }, 4000);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDetails = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Background with static gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1a2a4a] to-[#111827]" />
        {/* Static gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#F59E0B]/20 to-[#EC4899]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-[#8B5CF6]/20 to-[#06B6D4]/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 py-12 sm:py-20">
        <div className="text-center max-w-4xl mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 mb-6 sm:mb-8 max-w-full">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[#F59E0B] flex-shrink-0" />
            <span className="text-[10px] sm:text-sm text-[#FFF7ED]/80 leading-tight text-center">
              Cox's Bazar Polytechnic Institute • CSE • Session 2019-20
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 text-balance px-2">
            <span className="bg-gradient-to-r from-[#FFF7ED] via-[#F59E0B] to-[#FFF7ED] bg-clip-text text-transparent">
              আবার একসাথে
            </span>
            <br />
            <span className="text-[#FFF7ED]">সেই পুরোনো দিনগুলোর টানে</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#CBD5E1] mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            ২০२३ সালে ডিপ্লোমা শেষ করার পর জীবন সবাইকে ব্যস্ত করে ফেলেছে। তবুও কিছু সম্পর্ক, কিছু স্মৃতি, কিছু
            হাসি—সময় পেরিয়ে গেলেও মুছে যায় না। ঈদের পর কয়েকটা দিনের মধ্যে আমরা আবার একসাথে হতে চাই।
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
          >
            <Button
              size="lg"
              className="bg-[#F59E0B] hover:bg-[#DC8502] text-[#0F172A] font-semibold text-base sm:text-lg px-6 sm:px-8 rounded-lg w-full sm:w-auto"
              onClick={scrollToForm}
            >
              আমি আসতে চাই
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B]/10 font-semibold text-base sm:text-lg px-6 sm:px-8 rounded-lg w-full sm:w-auto"
              onClick={scrollToDetails}
            >
              বিস্তারিত দেখুন
            </Button>
          </div>

          {/* Event time note */}
          <div
            className="mt-10 sm:mt-16 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#F59E0B]/20 to-[#EC4899]/20 border border-[#F59E0B]/30 max-w-full"
          >
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B] flex-shrink-0" />
            <span className="text-sm sm:text-base text-[#FFF7ED]">ঈদের পর, ইনশাআল্লাহ</span>
          </div>
        </div>
      </section>

      {/* Emotional Message Section */}
      <section id="message" className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="max-w-5xl mx-auto">
          <div
            className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center"
          >
            {/* Left side - Main content */}
            <div className="px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFF7ED] mb-6 sm:mb-8 text-balance">
                এই আয়োজন শুধু একটা মিট-আপ না
              </h2>
              <p className="text-[#CBD5E1] text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                এটা আমাদের একসাথে কাটানো সময়গুলোর প্রতি ভালোবাসা।
              </p>
              <p className="text-[#CBD5E1] text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                একই ক্লাসরুম, একই ল্যাব, একই বেঞ্চ, একই টেনশন, একই স্বপ্ন—সবকিছু মিলিয়ে আমাদের জীবনের একটা
                বিশেষ অধ্যায়।
              </p>
              <p className="text-[#CBD5E1] text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                আজ আমরা যে যেখানেই থাকি না কেন, সেই দিনগুলোর স্মৃতি এখনো আমাদের ভেতরে বেঁচে আছে।
              </p>
              <p className="text-[#CBD5E1] text-sm sm:text-base md:text-lg leading-relaxed">
                তাই চাই, আবার একদিন সবাই মিলে বসি, গল্প করি, হাসি, ছবি তুলি, আর কিছু নতুন স্মৃতি তৈরি করি।
              </p>
            </div>

            {/* Right side - Quote card */}
            <div
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/20 to-transparent rounded-2xl blur-2xl" />
              <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-[#1E293B]/80 to-[#111827]/80 border border-[#F59E0B]/20 backdrop-blur-sm">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F59E0B] mb-4 sm:mb-6" />
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#FFF7ED] leading-relaxed italic">
                  "সময় চলে যায়, মানুষ ব্যস্ত হয়ে যায়, কিন্তু সত্যিকারের স্মৃতিগুলো কখনো পুরোনো হয় না।"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Reunion Matters */}
      <section id="details" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#FFF7ED] mb-16 text-center"
          >
            কেন আসা উচিত?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'পুরোনো বন্ধুদের সাথে আবার দেখা',
                description:
                  'অনেকদিন পর সবার সাথে সামনাসামনি দেখা, গল্প আর আড্ডা—এটাই হবে এই আয়োজনের সবচেয়ে বড় আনন্দ।',
                icon: Users,
              },
              {
                title: 'স্মৃতিগুলো আবার ছুঁয়ে দেখা',
                description:
                  'ক্লাস, প্র্যাকটিক্যাল, পরীক্ষা, ট্যুর, হাসি-মজা—সব পুরোনো মুহূর্তগুলো আবার মনে করার একটা সুন্দর সুযোগ।',
                icon: Heart,
              },
              {
                title: 'নতুন করে সংযোগ তৈরি',
                description:
                  'জীবন সবাইকে আলাদা পথে নিয়ে গেছে, কিন্তু এই আয়োজন আমাদের আবার এক সুতোয় গেঁথে দিতে পারে।',
                icon: Mail,
              },
              {
                title: 'একটা স্মরণীয় দিন',
                description:
                  'ব্যস্ত জীবনের ভিড়ে এমন একটা দিন দরকার, যেটা বহু বছর পরও মনে ��াকবে।',
                icon: Clock,
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-8 rounded-2xl bg-[#1E293B]/50 border border-[#334155] hover:border-[#F59E0B]/50 transition-colors">
                    <IconComponent className="w-10 h-10 text-[#F59E0B] mb-4" />
                    <h3 className="text-xl font-bold text-[#FFF7ED] mb-3">{item.title}</h3>
                    <p className="text-[#CBD5E1]">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Info Section */}
      <section id="info" className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFF7ED] mb-10 sm:mb-12 md:mb-16 text-center px-2"
          >
            প্রাথমিক পরিকল্পনা
          </h2>

          <div
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/20 to-transparent rounded-2xl blur-2xl" />
            <div className="relative p-5 sm:p-8 md:p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-[#1E293B]/80 to-[#111827]/80 border border-[#F59E0B]/20 backdrop-blur-sm">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
                {[
                  { label: 'আয়োজন', value: 'CSE Get Together' },
                  { label: 'প্রতিষ্ঠান', value: 'Cox\'s Bazar Polytechnic Institute' },
                  { label: 'ব্যাচ', value: 'Session 2019-20' },
                  { label: 'ডিপ্লোমা সম্পন্ন', value: '২०२३' },
                  { label: 'সম্ভাব্য সময়', value: 'ঈদের পর কয়েক দিনের মধ্যে' },
                  { label: 'স্থান', value: 'পরে সবাই মিলে ঠিক করা হবে' },
                  { label: 'উদ্দেশ্য', value: 'পুরোনো সহপাঠীদের পুনর্মিলনী', value2: '' },
                ].map((item, index) => (
                  <div key={index}>
                    <p className="text-xs sm:text-sm text-[#F59E0B] font-semibold mb-1 sm:mb-2">{item.label}</p>
                    <p className="text-[#FFF7ED] text-sm sm:text-base md:text-lg">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#334155] pt-5 sm:pt-6 md:pt-8">
                <p className="text-[#CBD5E1] italic text-center text-xs sm:text-sm md:text-base leading-relaxed">
                  তারিখ, সময় ও ভেন্যু সবার মতামত এবং অংশগ্রহণকারীর উপস্থিতি অনুযায়ী চূড়ান্ত করা হবে।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Form Section */}
      <section id="form" className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="max-w-3xl mx-auto">
          <div
            className="text-center mb-8 sm:mb-10 md:mb-12 px-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFF7ED] mb-3 sm:mb-4">
              তুমি কি আমাদের সাথে থাকবে?
            </h2>
            <p className="text-[#CBD5E1] text-sm sm:text-base md:text-lg leading-relaxed">
              যদি তুমি এই গেট-টুগেদারে অংশ নিতে আগ্রহী হও, তাহলে নিচের ফর্মটি পূরণ করে তোমার সম্মতি জানাও।
            </p>
          </div>

          <div
            ref={formRef}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/10 to-transparent rounded-2xl blur-2xl" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative p-5 sm:p-8 md:p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-[#1E293B]/80 to-[#111827]/80 border border-[#F59E0B]/20 backdrop-blur-sm space-y-5 sm:space-y-6"
            >
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-[#FFF7ED] mb-2 block">
                  পূর্ণ নাম <span className="text-[#EF4444]">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="আপনার পূর্ণ নাম"
                  {...register('fullName')}
                  className={`bg-[#0F172A] border-[#334155] text-[#FFF7ED] placeholder-[#64748B] ${
                    errors.fullName ? 'border-[#EF4444]' : ''
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[#EF4444] text-sm mt-1 font-medium">{errors.fullName.message}</p>
                )}
              </div>

              {/* Roll Number and Phone - Grid */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="rollNumber" className="text-[#FFF7ED] mb-2 block">
                    রোল নম্বর / পরিচিতি
                  </Label>
                  <Input
                    id="rollNumber"
                    placeholder="রোল নম্বর"
                    {...register('rollNumber')}
                    className="bg-[#0F172A] border-[#334155] text-[#FFF7ED] placeholder-[#64748B]"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#FFF7ED] mb-2 block">
                    মোবাইল নম্বর <span className="text-[#EF4444]">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="০১xxxxxxxxx"
                    {...register('phone')}
                    className={`bg-[#0F172A] border-[#334155] text-[#FFF7ED] placeholder-[#64748B] ${
                      errors.phone ? 'border-[#EF4444]' : ''
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[#EF4444] text-sm mt-1 font-medium">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Current Location */}
              <div>
                <Label htmlFor="currentLocation" className="text-[#FFF7ED] mb-2 block">
                  বর্তমানে কোথায় আছো?
                </Label>
                <Input
                  id="currentLocation"
                  placeholder="শহর/বিভাগ"
                  {...register('currentLocation')}
                  className="bg-[#0F172A] border-[#334155] text-[#FFF7ED] placeholder-[#64748B]"
                />
              </div>

              {/* Interest Level */}
              <div>
                <Label htmlFor="interest" className="text-[#FFF7ED] mb-2 block">
                  তুমি কি যোগ দিতে আগ্রহী? <span className="text-[#EF4444]">*</span>
                </Label>
                <Select value={interestValue} onValueChange={(value) => setValue('interest', value)}>
                  <SelectTrigger className={`bg-[#0F172A] border-[#334155] text-[#FFF7ED] ${
                    errors.interest ? 'border-[#EF4444]' : ''
                  }`}>
                    <SelectValue placeholder="একটি অপশন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] border-[#334155]">
                    <SelectItem value="definitely" className="text-[#FFF7ED]">
                      হ্যাঁ, ইনশাআল্লাহ আসবো
                    </SelectItem>
                    <SelectItem value="maybe" className="text-[#FFF7ED]">
                      চেষ্টা করবো
                    </SelectItem>
                    <SelectItem value="unsure" className="text-[#FFF7ED]">
                      এখনো নিশ্চিত না
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.interest && (
                  <p className="text-[#EF4444] text-sm mt-1 font-medium">{errors.interest.message}</p>
                )}
              </div>

              {/* Suggestions */}
              <div>
                <Label htmlFor="suggestions" className="text-[#FFF7ED] mb-2 block">
                  তোমার কোনো মতামত / প্রস্তাবনা
                </Label>
                <Textarea
                  id="suggestions"
                  placeholder="কোথায় এবং কখন আয়োজন করা ভালো হবে, তা নিয়ে যদি কোনো পরামর্শ থাকে..."
                  {...register('suggestions')}
                  className="bg-[#0F172A] border-[#334155] text-[#FFF7ED] placeholder-[#64748B] min-h-24"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  id="updates"
                  {...register('wantUpdates')}
                  defaultChecked={wantUpdatesValue}
                  className="w-4 h-4 accent-[#F59E0B] cursor-pointer"
                />
                <Label
                  htmlFor="updates"
                  className="text-[#CBD5E1] cursor-pointer"
                >
                  তারিখ ও স্থান চূড়ান্ত করার আপডেট পেতে চাই
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#F59E0B] hover:bg-[#DC8502] text-[#0F172A] font-semibold text-base sm:text-lg py-5 sm:py-6 rounded-lg mt-6 sm:mt-8"
              >
                সম্মতি জানাই
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section id="closing" className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFF7ED] mb-8 sm:mb-10 md:mb-12 text-balance px-2">
              চলো, আরেকবার সেই মানুষগুলোর কাছে ফিরে যাই
            </h2>

            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-[#CBD5E1] leading-relaxed mb-8 sm:mb-10 md:mb-12 px-2">
              <p>
                জীবনের ব্যস্ততায় সবাই দূরে সরে গেলেও, কিছু মানুষ আর কিছু স্মৃতি সবসময় আপন থেকে যায়।
              </p>
              <p>
                এই আয়োজন সেই আপন মানুষগুলোর জন্য।
              </p>
              <p>
                তোমার উপস্থিতিই এই মিলনমেলাকে পূর্ণ করবে।
              </p>
            </div>

            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#F59E0B]/20 to-[#EC4899]/20 border border-[#F59E0B]/30 max-w-full">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B] flex-shrink-0" />
              <span className="text-sm sm:text-base text-[#FFF7ED] font-semibold">ভালোবাসায় — CSE Session 2019-20</span>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Success Popup */}
      {showSuccess && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="relative w-full max-w-md bg-gradient-to-br from-[#1E293B]/95 to-[#111827]/95 border border-[#F59E0B]/30 rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#CBD5E1] hover:text-[#FFF7ED] transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Content */}
            <div className="text-center">
              <div
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/20 to-[#EC4899]/20 rounded-full"
                  />
                  <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-[#F59E0B] relative z-10" />
                </div>
              </div>

              <div
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#FFF7ED] mb-2">
                  অনেক ভালো লাগলো!
                </h3>
                <p className="text-sm sm:text-base text-[#CBD5E1] mb-4 sm:mb-6">
                  তোমার সম্মতি পাওয়া গেছে। ধন্যবাদ আমাদের সাথে থাকার জন্য।
                </p>
              </div>

              {/* Submitted Details */}
              {successData && (
                <div
                  className="bg-[#0F172A]/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-left text-xs sm:text-sm space-y-2"
                >
                  <div>
                    <span className="text-[#F59E0B] font-semibold">নাম:</span>
                    <span className="text-[#FFF7ED] ml-2 break-words">{successData.fullName}</span>
                  </div>
                  {successData.phone && (
                    <div>
                      <span className="text-[#F59E0B] font-semibold">ফোন:</span>
                      <span className="text-[#FFF7ED] ml-2">{successData.phone}</span>
                    </div>
                  )}
                  {successData.currentLocation && (
                    <div>
                      <span className="text-[#F59E0B] font-semibold">অবস্থান:</span>
                      <span className="text-[#FFF7ED] ml-2 break-words">{successData.currentLocation}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[#F59E0B] font-semibold">আগ্রহ:</span>
                    <span className="text-[#FFF7ED] ml-2">
                      {successData.interest === 'definitely' && 'হ্যাঁ, ইনশাআল্লাহ আসবো'}
                      {successData.interest === 'maybe' && 'চেষ্টা করবো'}
                      {successData.interest === 'unsure' && 'এখনো নিশ্চিত না'}
                    </span>
                  </div>
                </div>
              )}

              <p
                className="text-[#CBD5E1] text-xs sm:text-sm italic"
              >
                খুব শীঘ্রই চূড়ান্ত আপডেট জানানো হবে, ইনশাআল্লাহ।
              </p>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute top-2 left-4 w-2 h-2 bg-[#F59E0B] rounded-full"
            />
            <div
              className="absolute bottom-4 right-6 w-2 h-2 bg-[#EC4899] rounded-full"
            />
          </div>
        </div>
      )}
    </main>
  );
}
